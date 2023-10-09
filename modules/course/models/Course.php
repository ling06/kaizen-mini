<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\User;
use app\modules\course\models\queries\CourseQuery;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "course".
 *
 * @property int $id
 * @property string|null $title Название
 * @property string|null $description Описание
 * @property int|null $is_open Все ли главы доступны сразу
 * @property int|null $status Статус
 * @property int|null $user_id Id создателя
 * @property string|null $date Дата создания
 * @property int|null $is_deleted Удален ли курс
 *
 * @property Chapter[] $chapters
 * @property User $user
 */
class Course extends \app\components\ActiveRecord
{

    public const PERMISSION_READ = 'course-read';
    public const PERMISSION_CREATE = 'course-create';
    public const PERMISSION_UPDATE = 'course-update';
    public const PERMISSION_DELETE = 'course-delete';

    public const PERMISSION_CHECK_ANSWERS = 'course-check_answers';

    public const STATUS_DRAFT = 0;
    public const STATUS_PUBLISHED = 1;

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'course';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['description'], 'string'],
            [['is_open', 'status', 'user_id'], 'integer'],
            [['date'], 'safe'],
            [['title'], 'string', 'max' => 200],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['status'], 'in', 'range' => [static::STATUS_DRAFT, static::STATUS_PUBLISHED]],
            [['status'], 'default', 'value' => static::STATUS_DRAFT],
            [['is_open'], 'default', 'value' => 1],
            [['is_deleted'], 'boolean'],
            [['is_deleted'], 'default', 'value' => false],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'title' => 'Название',
            'description' => 'Описание',
            'is_open' => 'Все ли главы доступны сразу',
            'status' => 'Статус',
            'user_id' => 'Id создателя',
            'date' => 'Дата создания',
            'is_deleted' => 'Удален ли курс',
        ];
    }

    /**
     * Gets query for [[Chapters]].
     *
     * @return ActiveQuery|\app\modules\course\models\queries\ChapterQuery
     */
    public function getChapters(): ActiveQuery
    {
        return $this->hasMany(Chapter::class, ['course_id' => 'id']);
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
     * {@inheritdoc}
     * @return CourseQuery the active query used by this AR class.
     */
    public static function find(): CourseQuery
    {
        return new CourseQuery(static::class);
    }

    public function scenarios(): array
    {
        $scenarios = parent::scenarios();
        $scenarios[DeleteSoftBehavior::SCENARIO_DELETE_SOFT] = ['is_deleted'];
        $scenarios[DeleteSoftBehavior::SCENARIO_RESTORE] = ['is_deleted'];
        return $scenarios;
    }

    public function behaviors(): array
    {
        return [
            'deleteSoft' => [
                'class' => DeleteSoftBehavior::class,
            ],
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
