<?php

namespace app\modules\course\models;

use app\models\User;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user_check".
 *
 * @property int $user_id Id пользователя
 * @property string $model_name Прочтенная модель
 * @property int $model_pk Id прочтенной модели
 *
 * @property-read ActiveRecord|null $model
 * @property User $user
 */
class UserCheck extends \app\components\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'user_check';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['user_id', 'model_name', 'model_pk'], 'required'],
            [['user_id', 'model_pk'], 'integer'],
            [['model_name'], 'string', 'max' => 200],
            [['user_id', 'model_name', 'model_pk'], 'unique', 'targetAttribute' => ['user_id', 'model_name', 'model_pk']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'user_id' => 'Id пользователя',
            'model_name' => 'Прочтенная модель',
            'model_pk' => 'Id прочтенной модели',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return ActiveQuery
     */
    public function getUser(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * Получить связанную запись
     * @return ActiveRecord|null
     */
    public function getModel(): ?ActiveRecord
    {
        $className = $this->model_name;
        return $className::findOne($this->model_pk);
    }

    /**
     * @param $insert
     * @param $changedAttributes
     * @return void
     */
    public function afterSave($insert, $changedAttributes)
    {
        $itemsId = [];
        $currentModel = $this->getModel();
        $parentId = null;
        switch ($this->model_name) {
            case Theme::class:
                $updatedClass = Chapter::class;
                $parentId = $currentModel->chapter_id;
                $parent = 'chapter_id';
                break;
            case Lesson::class:
                $updatedClass = Theme::class;
                $parentId = $currentModel->theme_id;
                $parent = 'theme_id';
                break;
            case Chapter::class:
                $updatedClass = Course::class;
                $parentId = $currentModel->course_id;
                $parent = 'course_id';
                break;
        }
        if (!$parentId) {
            return;
        }
        $allItems = $this->model_name::find()->where([$parent => $parentId, 'is_deleted' => 0])->select('id')->asArray()->indexBy('id')->all();
        foreach ($allItems as $ItemId => $item) {
            $itemsId[] = $ItemId;
        }
        $usersCheksLessons = self::find()->where(['user_id' => $this->user_id, 'model_name' => $this->model_name, 'model_pk' => $itemsId])->asArray()->all();
        if (count($itemsId) === count($usersCheksLessons)) {
            $themeCheck = new UserCheck;
            $themeCheck->user_id = $this->user_id;
            $themeCheck->model_name = $updatedClass;
            $themeCheck->model_pk = $parentId;
            $themeCheck->save();
        }
        parent::afterSave($insert, $changedAttributes);
    }

    public static function findNextLesson($currentLesson)
    {
        $lesson = Lesson::find()->where(['theme_id' => $currentLesson->theme_id, 'is_deleted' => false, 'position' => $currentLesson->position + 1])->one();
        if ($lesson) {
            $theme = Theme::findOne($lesson->theme_id);
            $chapter = Chapter::findOne($theme->chapter_id);
        } else {
            $currentTheme = Theme::findOne($currentLesson->theme_id);
            $theme = Theme::find()->where(['chapter_id' => $currentTheme->chapter_id, 'is_deleted' => false, 'position' => $currentTheme->position + 1])->one();
            if ($theme) {
                $lesson = Lesson::find()->where(['theme_id' => $theme->id, 'is_deleted' => false, 'position' => 0])->one();
                $chapter = Chapter::findOne($theme->chapter_id);
            } else {
                $currentChapter = Chapter::findOne($currentTheme->chapter_id);
                $chapter = Chapter::find()->where(['course_id' => $currentChapter->course_id, 'is_deleted' => false, 'position' => $currentChapter->position + 1])->one();
                if ($chapter) {
                    $theme = Theme::find()->where(['chapter_id' => $chapter->id, 'is_deleted' => false, 'position' => 0])->one();
                    $lesson = Lesson::find()->where(['theme_id' => $theme->id, 'is_deleted' => false, 'position' => 0])->one();
                } else {
                    return ['lesson' => 'end', 'theme' => 'end', 'chapter' => 'end'];
                }

            }
        }
        return [
            'lesson' => $lesson->id ?? 'end',
            'theme' => $theme->id ?? 'end',
            'chapter' => $chapter->id ?? 'end',
        ];
    }

}
