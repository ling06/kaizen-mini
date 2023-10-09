<?php

namespace app\modules\course\models;

use app\models\User;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "user_test_answer".
 *
 * @property int $test_question_id
 * @property int $user_id
 * @property string|null $answer
 * @property int|null $is_right
 * @property string|null $date
 *
 * @property Question $testQuestion
 * @property User $user
 */
class UserTestAnswer extends \app\components\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'user_test_answer';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['test_question_id', 'user_id'], 'required'],
            [['test_question_id', 'user_id', 'is_right'], 'integer'],
            [['answer'], 'string'],
            [['date'], 'safe'],
            [['test_question_id', 'user_id'], 'unique', 'targetAttribute' => ['test_question_id', 'user_id']],
            [['test_question_id'], 'exist', 'skipOnError' => true, 'targetClass' => Question::class, 'targetAttribute' => ['test_question_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'test_question_id' => 'Test Question ID',
            'user_id' => 'User ID',
            'answer' => 'Answer',
            'is_right' => 'Is Right',
            'date' => 'Date',
        ];
    }

    /**
     * Gets query for [[Question]].
     *
     * @return ActiveQuery
     */
    public function getTestQuestion(): ActiveQuery
    {
        return $this->hasOne(Question::class, ['id' => 'test_question_id']);
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

    public function behaviors(): array
    {
        return [
            'date' => [
                'class' => TimestampBehavior::class,
                'createdAtAttribute' => 'date',
                'updatedAtAttribute' => null,
                'value' => date('Y-m-d H:i:s'),
            ],
        ];
    }

}
