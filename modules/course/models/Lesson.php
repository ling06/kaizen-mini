<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\User;
use app\modules\course\models\queries\LessonQuery;
use yii\base\Model;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "lesson".
 *
 * @property int $id
 * @property int|null $theme_id Id темы
 * @property string|null $title Название
 * @property string|null $description Описание
 * @property string|null $description_autosave Автосохраненное описание
 * @property int|null $status Статус
 * @property int|null $user_id Id создателя
 * @property string|null $date Дата создания
 * @property int|null $is_deleted Удален ли урок
 *
 * @property Theme $theme
 * @property User $user
 * @property Test $test
 */
class Lesson extends \app\components\ActiveRecord
{

    public const SCENARIO_AUTOSAVE = 'autosave';

    public const STATUS_DRAFT = 0;
    public const STATUS_PUBLISHED = 1;

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'course_lesson';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['theme_id', 'status', 'user_id'], 'integer'],
            [['description'], 'string'],
            [['date'], 'safe'],
            [['title'], 'string', 'max' => 200],
            [['theme_id'], 'exist', 'skipOnError' => true, 'targetClass' => Theme::class, 'targetAttribute' => ['theme_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['status'], 'in', 'range' => [static::STATUS_DRAFT, static::STATUS_PUBLISHED]],
            [['status'], 'default', 'value' => static::STATUS_DRAFT],
            [['date'], 'datetime', 'format' => 'php:Y-m-d H:i:s'],
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
            'theme_id' => 'Id темы',
            'title' => 'Название',
            'description' => 'Описание',
            'status' => 'Статус',
            'user_id' => 'Id создателя',
            'date' => 'Дата создания',
            'is_deleted' => 'Удален ли урок',
        ];
    }

    /**
     * Gets query for [[Theme]].
     *
     * @return ActiveQuery|\app\modules\course\models\queries\ThemeQuery
     */
    public function getTheme(): ActiveQuery
    {
        return $this->hasOne(Theme::class, ['id' => 'theme_id']);
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
     * @return ActiveQuery|\app\modules\course\models\queries\TestQuery
     */
    public function getTest(): ActiveQuery
    {
        return $this->hasOne(Test::class, ['lesson_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     * @return LessonQuery the active query used by this AR class.
     */
    public static function find(): LessonQuery
    {
        return new LessonQuery(static::class);
    }

    public function scenarios(): array
    {
        $scenarios = parent::scenarios();
        $scenarios[DeleteSoftBehavior::SCENARIO_DELETE_SOFT] = ['is_deleted'];
        $scenarios[DeleteSoftBehavior::SCENARIO_RESTORE] = ['is_deleted'];
        $scenarios[static::SCENARIO_AUTOSAVE] = ['description_autosave'];
        return $scenarios;
    }

    public function beforeSave($insert): bool
    {
        if ($this->scenario === Model::SCENARIO_DEFAULT) {
            $this->description = $this->description_autosave;
        }
        return parent::beforeSave($insert);
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
