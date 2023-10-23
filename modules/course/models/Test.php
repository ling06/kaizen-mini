<?php

namespace app\modules\course\models;

use app\models\User;
use app\modules\course\models\queries\TestQuery;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "test".
 *
 * @property int $id
 * @property int|null $lesson_id Id урока
 * @property int|null $is_active Активен ли тест
 * @property int|null $user_id Id автора
 * @property string|null $date Дата создания
 *
 * @property Lesson $lesson
 * @property User $user
 * @property Question[] $testQuestions
 */
class Test extends \app\components\ActiveRecord
{

    public static function getExtraFields(): array
    {
        return [
            'test' => 'testQuestions',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'test';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['lesson_id', 'user_id'], 'integer'],
            [['date'], 'safe'],
            [['lesson_id'], 'exist', 'skipOnError' => true, 'targetClass' => Lesson::class, 'targetAttribute' => ['lesson_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['is_active'], 'boolean'],
            [['is_active'], 'default', 'value' => false],
            [['question'], 'text']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'lesson_id' => 'Id урока',
            'is_active' => 'Активен ли тест',
            'user_id' => 'Id автора',
            'date' => 'Дата создания',
            'question' => 'Вопрос теста'
        ];
    }

    /**
     * Gets query for [[Lesson]].
     *
     * @return ActiveQuery|\app\modules\course\models\queries\LessonQuery
     */
    public function getLesson(): ActiveQuery
    {
        return $this->hasOne(Lesson::class, ['id' => 'lesson_id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return ActiveQuery|\app\models\queries\UserQuery
     */
    public function getUser(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * Gets query for [[TestQuestions]].
     *
     * @return ActiveQuery
     */
    public function getTestQuestions(): ActiveQuery
    {
        return $this->hasMany(Question::class, ['test_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return TestQuery the active query used by this AR class.
     */
    public static function find(): TestQuery
    {
        return new TestQuery(static::class);
    }

    public function behaviors(): array
    {
        return [
            'author' => [
                'class' => BlameableBehavior::class,
                'createdByAttribute' => 'user_id',
                'updatedByAttribute' => null,
            ],
            'date' => [
                'class' => TimestampBehavior::class,
                'createdAtAttribute' => 'date',
                'updatedAtAttribute' => null,
                'value' => date('Y-m-d H:i:s'),
            ],
        ];
    }

}
