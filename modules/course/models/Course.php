<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\components\behaviors\ImageBehavior;
use app\models\Image;
use app\models\User;
use app\modules\course\models\queries\CourseQuery;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;
use yii\helpers\ArrayHelper;

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
 * @property-read array $percentage
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

    public static function getExtraFields(): array
    {
        return [
            'percentage' => 'percentage',
            'chapters' => 'chapters',
            'user' => static function ($model) {
                return $model->getUser()->select('id, name')->one();
            },
            'image' => static function ($model) {
                return $model->getImage()->select('server, directory, name')->one();
            },
        ];
    }


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
            [['date', 'image'], 'safe'],
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
            'image' => 'Изображение',
        ];
    }

    public function getChapters()
    {
        $chapters = Chapter::find()->where(['course_id' => $this->id])->all();
        $result = [];
        foreach ($chapters as $key => $chapter) {
            $result[$key]['course_id'] = $chapter->course_id;
            $result[$key]['title'] = $chapter->title;
            $result[$key]['id'] = $chapter->id;
            $result[$key]['user_id'] = $chapter->user_id;
            $result[$key]['date'] = $chapter->date;
            $result[$key]['is_deleted'] = $chapter->is_deleted;
            $result[$key]['image'] = Image::find()->select('server, directory, name')->where(['model_name' => Chapter::class, 'model_pk' => $chapter->id])->one();
        }
        return $result;
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
     * Получить прогресс курса
     * @return array
     */
    public function getPercentage(): array
    {
        $lessons = Lesson::find()
            ->alias('lesson')
            ->leftJoin(['theme' => Theme::tableName()], 'theme.id = lesson.theme_id')
            ->leftJoin(['chapter' => Chapter::tableName()], 'chapter.id = theme.chapter_id')
            ->leftJoin(['course' => Course::tableName()], 'course.id = chapter.course_id')
            ->where([
                'lesson.is_deleted' => false,
                'theme.is_deleted' => false,
                'chapter.is_deleted' => false,
                'course.is_deleted' => false,
                'course.id' => $this->id,
            ])
            ->asArray()
            ->all();
        $lessonsCount = count($lessons);

        $checkedLessonsCount = UserCheck::find()
            ->where([
                'user_id' => \Yii::$app->user->id,
                'model_name' => Lesson::class,
                'model_pk' => ArrayHelper::getColumn($lessons, 'id'),
            ])
            ->count();

        return [
            'lessonsCount' => $lessonsCount,
            'checkedLessonsCount' => $checkedLessonsCount,
            'percentage' => $lessonsCount
                ? floor($checkedLessonsCount / $lessonsCount * 100)
                : 0,
        ];
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
            'image' => [
                'class' => ImageBehavior::class,
            ],
        ];
    }

}
