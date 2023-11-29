<?php

namespace app\modules\course\models;

use app\models\User;
use Yii;
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
        $role = Yii::$app->user->identity->role;
        $lesson = Lesson::find()->where(['theme_id' => $currentLesson->theme_id])->orderBy('position ASC')->all();
        $nextLesson = null;
        $nextTheme = null;
        $nextChapter = null;
        $currentLessonTheme = $currentLesson->theme_id;
        foreach ($lesson as $lessonItem) {
            if ($role != 'admin' && $lessonItem->position > $currentLesson->position && !$nextLesson && !$lessonItem->is_deleted && $lessonItem->status == Lesson::STATUS_PUBLISHED) {
                $nextLesson = $lessonItem->id;
                $currentLessonTheme = $lessonItem->theme_id;
            }
            if($role == 'admin' && $lessonItem->position > $currentLesson->position && !$nextLesson){
                $nextLesson = $lessonItem->id;
                $currentLessonTheme = $lessonItem->theme_id;
            }
        }
        if ($nextLesson) {
            $currentTheme = Theme::findOne($currentLessonTheme);
            $nextTheme = $currentTheme->id;
            $currentChapter = Chapter::findOne($currentTheme->chapter_id);
            $nextChapter = $currentChapter->id;
        } else {
            $currentTheme = Theme::findOne($currentLessonTheme);
            $theme = Theme::find()->where(['chapter_id' => $currentTheme->chapter_id])->all();
            foreach ($theme as $themeItem) {
                if ($role != 'admin' && $themeItem->position > $currentTheme['position'] && !$nextTheme && !$themeItem->is_deleted) {
                    $nextTheme = $themeItem->id;
                    $currentThemeChapter = $themeItem->chapter_id;
                }
                if($role == 'admin' && $themeItem->position > $currentTheme['position'] && !$nextTheme){
                    $nextTheme = $themeItem->id;
                    $currentThemeChapter = $themeItem->chapter_id;
                }
            }
            if ($nextTheme) {
                $currentChapter = Chapter::findOne($currentThemeChapter);
                $nextChapter = $currentChapter->id;
                $lesson = Lesson::find()->where(['theme_id'=>$nextTheme])->all();
                foreach ($lesson as $lessonItem) {
                    if ($role != 'admin' && !$nextLesson && !$lessonItem->is_deleted && $lessonItem->status == Lesson::STATUS_PUBLISHED) {
                        $nextLesson = $lessonItem->id;
                    }
                    if($role == 'admin' && !$nextLesson){
                        $nextLesson = $lessonItem->id;
                    }
                }
            } else {
                $currentTheme = Theme::findOne($currentLessonTheme);
                $currentChapter = Chapter::findOne($currentTheme->chapter_id);
                $chapter = Chapter::find()->where(['course_id' => $currentChapter->course_id])->all();
                foreach ($chapter as $chapterItem) {
                    if ($role != 'admin' && $chapterItem->position > $currentChapter->position && !$nextChapter && !$chapterItem->is_deleted) {
                        $nextChapter = $chapterItem->id;
                    }
                    if($role == 'admin' && $chapterItem->position > $currentChapter->position && !$nextChapter){
                        $nextChapter = $chapterItem->id;
                    }
                }
                if($nextChapter) {
                    $theme = Theme::find()->where(['chapter_id' => $nextChapter])->all();
                    foreach ($theme as $themeItem) {
                        if ($role != 'admin' && !$nextTheme && !$themeItem->is_deleted) {
                            $nextTheme = $themeItem->id;
                        }
                        if($role == 'admin' && !$nextTheme){
                            $nextTheme = $themeItem->id;
                        }
                    }
                    $lesson = Lesson::find()->where(['theme_id'=>$nextTheme])->all();
                    foreach ($lesson as $lessonItem) {
                        if ($role != 'admin' && !$nextLesson && !$lessonItem->is_deleted && $lessonItem->status == Lesson::STATUS_PUBLISHED) {
                            $nextLesson = $lessonItem->id;
                        }
                        if($role == 'admin' && !$nextLesson){
                            $nextLesson = $lessonItem->id;
                        }
                    }
                }
            }
        }
        return [
            'lesson' => $nextLesson ?? 'end',
            'theme' => $nextTheme ?? 'end',
            'chapter' => $nextChapter ?? 'end',
        ];
    }

}
