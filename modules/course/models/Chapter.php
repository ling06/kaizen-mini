<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\components\behaviors\ImageBehavior;
use app\components\KaizenHelper;
use app\models\User;
use app\modules\course\models\queries\ChapterQuery;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "chapter".
 *
 * @property int $id
 * @property int|null $course_id Id курса
 * @property string|null $title Название
 * @property int|null $user_id Id создателя
 * @property string|null $date Дата создания
 * @property int|null $is_deleted Удалена ли глава
 * @property int $position [int(11)]  Позиция главы
 *
 * @property Course $course
 * @property User $user
 * @property Theme[] $themes
 */
class Chapter extends \app\components\ActiveRecord
{

    public static function getExtraFields(): array
    {
        return [
            'themes' => 'themes',
            'isChecked' => 'isChecked',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'course_chapter';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['course_id', 'user_id'], 'integer'],
            [['date', 'image'], 'safe'],
            [['title'], 'string', 'max' => 200],
            [['course_id'], 'exist', 'skipOnError' => true, 'targetClass' => Course::class, 'targetAttribute' => ['course_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['date'], 'datetime', 'format' => 'php:Y-m-d H:i:s'],
            [['is_deleted'], 'boolean'],
            [['is_deleted'], 'default', 'value' => false],
            [['position'], 'integer']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'course_id' => 'Id курса',
            'title' => 'Название',
            'user_id' => 'Id создателя',
            'date' => 'Дата создания',
            'is_deleted' => 'Удалена ли глава',
            'image' => 'Изображение',
        ];
    }

    /**
     * Gets query for [[Course]].
     *
     * @return ActiveQuery|\app\modules\course\models\queries\CourseQuery
     */
    public function getCourse(): ActiveQuery
    {
        return $this->hasOne(Course::class, ['id' => 'course_id']);
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
     * Gets query for [[Themes]].
     *
     * @return ActiveQuery|\app\modules\course\models\queries\ThemeQuery
     */
    public function getThemes(): ActiveQuery
    {
        return $this->hasMany(Theme::class, ['chapter_id' => 'id']);
    }

    public function getIsChecked(): bool
    {
        return UserCheck::find()->where([
            'model_name' => static::class,
            'model_pk' => $this->id,
            'user_id' => \Yii::$app->user->id,
        ])->exists();
    }

    /**
     * {@inheritdoc}
     * @return ChapterQuery the active query used by this AR class.
     */
    public static function find(): ChapterQuery
    {
        return new ChapterQuery(static::class);
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
