<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\User;
use app\modules\course\models\queries\ThemeQuery;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "theme".
 *
 * @property int $id
 * @property int|null $chapter_id Id главы
 * @property string|null $title Название
 * @property int|null $user_id Id создателя
 * @property string|null $date Дата создания
 * @property int|null $is_deleted Удалена ли тема
 *
 * @property Lesson[] $lessons
 * @property Chapter $chapter
 * @property-read bool $isCompleted
 * @property-read bool $isChecked
 * @property User $user
 */
class Theme extends \app\components\ActiveRecord
{

    public static function getExtraFields(): array
    {
        return [
            'lessons' => 'lessons',
            'isChecked' => 'isChecked',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'course_theme';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['chapter_id', 'user_id'], 'integer'],
            [['date'], 'safe'],
            [['title'], 'string', 'max' => 200],
            [['chapter_id'], 'exist', 'skipOnError' => true, 'targetClass' => Chapter::class, 'targetAttribute' => ['chapter_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
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
            'chapter_id' => 'Id главы',
            'title' => 'Название',
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

    public function getIsCompleted(): bool
    {
        $lessons = Lesson::find()
            ->alias('lesson')
            ->leftJoin(['theme' => Theme::tableName()], 'theme.id = lesson.theme_id')
            ->where([
                'lesson.is_deleted' => false,
                'theme.is_deleted' => $this->id,
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

        return $checkedLessonsCount === $lessonsCount;
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
            'date' => [
                'class' => TimestampBehavior::class,
                'createdAtAttribute' => 'date',
                'updatedAtAttribute' => null,
                'value' => date('Y-m-d H:i:s'),
            ],
        ];
    }

}
