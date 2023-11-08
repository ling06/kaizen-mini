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

    public function afterSave($insert, $changedAttributes)
    {
        $lessonsId = [];
        $currentLesson = Lesson::find()->where(['id' => $this->model_pk])->one();
        $currentTheme = $currentLesson['theme_id'];
        $allLessons = Lesson::find()->where(['theme_id' => $currentTheme, 'is_deleted' => 0])->select('id')->asArray()->indexBy('id')->all();
        foreach ($allLessons as $lessonId => $lesson) {
            $lessonsId[] = $lessonId;
        }
        $usersCheks = self::find()->where(['user_id' => $this->user_id, 'model_name' => $this->model_name, 'model_pk' => $lessonsId])->asArray()->all();
        var_dump(count($lessonsId));
        var_dump(count($usersCheks));
        if(count($lessonsId) === count($usersCheks)) {
            $themeCheck = new UserCheck;
            $themeCheck->user_id = $this->user_id;
            $themeCheck->model_name = Theme::class;
            $themeCheck->model_pk = $currentTheme;
            $themeCheck->save();
        }
    }

}
