<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\User;
use app\modules\course\models\queries\ThemeQuery;
use yii\behaviors\BlameableBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "theme".
 *
 * @property int $id
 * @property int|null $chapter_id Id главы
 * @property string|null $name Название
 * @property int|null $status Статус
 * @property int|null $user_id Id создателя
 * @property string|null $date Дата создания
 * @property int|null $is_deleted Удалена ли тема
 *
 * @property Lesson[] $lessons
 * @property Chapter $chapter
 * @property User $user
 */
class Theme extends \yii\db\ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'theme';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['chapter_id', 'status', 'user_id', 'is_deleted'], 'integer'],
            [['date'], 'safe'],
            [['name'], 'string', 'max' => 200],
            [['chapter_id'], 'exist', 'skipOnError' => true, 'targetClass' => Chapter::class, 'targetAttribute' => ['chapter_id' => 'id']],
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
            'chapter_id' => 'Id главы',
            'name' => 'Название',
            'status' => 'Статус',
            'user_id' => 'Id создателя',
            'date' => 'Дата создания',
            'is_deleted' => 'Удалена ли тема',
        ];
    }

    /**
     * Gets query for [[Lessons]].
     *
     * @return ActiveQuery|\app\modules\course\models\queries\LessonQuery
     */
    public function getLessons(): ActiveQuery
    {
        return $this->hasMany(Lesson::class, ['theme_id' => 'id']);
    }

    /**
     * Gets query for [[Chapter]].
     *
     * @return ActiveQuery|\app\modules\course\models\queries\ChapterQuery
     */
    public function getChapter(): ActiveQuery
    {
        return $this->hasOne(Chapter::class, ['id' => 'chapter_id']);
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
     * @return ThemeQuery the active query used by this AR class.
     */
    public static function find(): ThemeQuery
    {
        return new ThemeQuery(static::class);
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