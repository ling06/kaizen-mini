<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\User;
use app\modules\course\models\queries\LessonQuery;
use yii\behaviors\BlameableBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "lesson".
 *
 * @property int $id
 * @property int|null $theme_id Id темы
 * @property string|null $name Название
 * @property string|null $description Описание
 * @property int|null $status Статус
 * @property int|null $user_id Id создателя
 * @property string|null $date Дата создания
 * @property int|null $is_deleted Удален ли урок
 *
 * @property Theme $theme
 * @property User $user
 */
class Lesson extends \yii\db\ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'lesson';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['theme_id', 'status', 'user_id', 'is_deleted'], 'integer'],
            [['description'], 'string'],
            [['date'], 'safe'],
            [['name'], 'string', 'max' => 200],
            [['theme_id'], 'exist', 'skipOnError' => true, 'targetClass' => Theme::class, 'targetAttribute' => ['theme_id' => 'id']],
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
            'theme_id' => 'Id темы',
            'name' => 'Название',
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
        ];
    }

}
