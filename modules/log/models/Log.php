<?php

namespace app\modules\log\models;

use app\models\queries\UserQuery;
use app\models\User;
use app\modules\log\models\queries\LogQuery;

/**
 * This is the model class for table "log".
 *
 * @property int $id
 * @property string|null $date Дата изменения
 * @property int|null $user_id Id автора
 * @property string|null $modelClass Класс измененной модели
 * @property string|null $modelPk Primary key измененной модели
 * @property string|null $oldAttributes Атрибуты модели до изменения, json
 * @property string|null $newAttributes Атрибуты модели после изменения, json
 *
 * @property User $user
 */
class Log extends \app\components\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'log';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['date'], 'safe'],
            [['user_id'], 'integer'],
            [['oldAttributes', 'newAttributes'], 'string'],
            [['modelClass'], 'string', 'max' => 250],
            [['modelPk'], 'string', 'max' => 20],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'date' => 'Дата изменения',
            'user_id' => 'Id автора',
            'modelClass' => 'Класс измененной модели',
            'modelPk' => 'Primary key измененной модели',
            'oldAttributes' => 'Атрибуты модели до изменения, json',
            'newAttributes' => 'Атрибуты модели после изменения, json',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery|UserQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return LogQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new LogQuery(get_called_class());
    }
}
