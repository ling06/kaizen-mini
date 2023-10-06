<?php

namespace app\modules\course\models;

use app\models\User;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "test_question".
 *
 * @property int $id
 * @property int|null $test_id Id теста
 * @property string|null $text Текст вопроса
 * @property string|null $answers Варианты ответов, json
 * @property string|null $right_answer Правильный ответ
 * @property int|null $user_id Id автора
 * @property string|null $date Дата создания
 *
 * @property Test $test
 * @property User $user
 * @property UserTestAnswer[] $userTestAnswers
 * @property User[] $users
 */
class Question extends \app\components\ActiveRecord
{

    private $_answers;

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'test_question';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['test_id', 'user_id'], 'integer'],
            [['text', 'answers', 'right_answer'], 'string'],
            [['date'], 'safe'],
            [['test_id'], 'exist', 'skipOnError' => true, 'targetClass' => Test::class, 'targetAttribute' => ['test_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'test_id' => 'Id теста',
            'text' => 'Текст вопроса',
            'answers' => 'Варианты ответов, json',
            'right_answer' => 'Правильный ответ',
            'user_id' => 'Id автора',
            'date' => 'Дата создания',
        ];
    }

    /**
     * Gets query for [[Test]].
     *
     * @return ActiveQuery
     */
    public function getTest(): ActiveQuery
    {
        return $this->hasOne(Test::class, ['id' => 'test_id']);
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
     * Gets query for [[UserTestAnswers]].
     *
     * @return ActiveQuery
     */
    public function getUserTestAnswers(): ActiveQuery
    {
        return $this->hasMany(UserTestAnswer::class, ['test_question_id' => 'id']);
    }

    /**
     * Gets query for [[Users]].
     *
     * @return ActiveQuery
     */
    public function getUsers(): ActiveQuery
    {
        return $this->hasMany(User::class, ['id' => 'user_id'])->viaTable('user_test_answer', ['test_question_id' => 'id']);
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

    public function load($data, $formName = null): bool
    {
        if ($formName) {
            if ($data[$formName]['answers']) {
                $this->_answers = $data[$formName]['answers'];
            }
        } else {
            if ($data['answers']) {
                $this->_answers = $data['answers'];
            }
        }
        return parent::load($data, $formName);
    }

    public function validate($attributeNames = null, $clearErrors = true): bool
    {
        foreach ($this->_answers as $answerData) {
            $answer = new Answer($answerData);
            if (!$answer->validate()) {
                $this->addError('answers', 'Ошибка в одном из вопросов.');
            }
        }
        return parent::validate($attributeNames, $clearErrors);
    }

    public function beforeSave($insert): bool
    {
        if ($this->_answers !== null) {
            $answers = [];
            foreach ($this->_answers as $answerData) {
                $answer = new Answer($answerData);
                $answers[] = $answer->toArray();
            }
            $this->answers = json_encode($answers);
        }
        if (is_array($this->answers)) {
            $this->answers = json_encode($this->answers);
        }
        return parent::beforeSave($insert);
    }

    public function afterFind(): void
    {
        $this->answers = json_decode($this->answers, true);
        parent::afterFind();
    }

}
