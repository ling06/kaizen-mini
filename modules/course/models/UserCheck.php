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

}
