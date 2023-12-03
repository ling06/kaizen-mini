<?php

namespace app\modules\course\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\User;
use app\modules\course\models\queries\LessonQuery;
use Yii;
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
 * @property int $position [int(11)]  Позиция урока
 *
 * @property Theme $theme
 * @property User $user
 * @property-read bool $isChecked
 * @property Test $test
 */
class Lesson extends \app\components\ActiveRecord
{

    public const SCENARIO_AUTOSAVE = 'autosave';

    public const STATUS_DRAFT = 0;
    public const STATUS_PUBLISHED = 1;

    public static function getExtraFields(): array
    {
        return [
            'tests' => 'test',
            'breadCrumbs' => 'breadCrumbs',
            'isChecked' => 'isChecked',
        ];
    }

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
            [['description', 'description_autosave'], 'string'],
            [['date'], 'safe'],
            [['title'], 'string', 'max' => 200],
            [['theme_id'], 'exist', 'skipOnError' => true, 'targetClass' => Theme::class, 'targetAttribute' => ['theme_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['status'], 'in', 'range' => [static::STATUS_DRAFT, static::STATUS_PUBLISHED]],
            [['status'], 'default', 'value' => static::STATUS_DRAFT],
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
            'theme_id' => 'Id темы',
            'title' => 'Название',
            'description' => 'Описание',
            'description_autosave' => 'Описание',
            'status' => 'Статус',
            'user_id' => 'Id создателя',
            'date' => 'Дата создания',
            'is_deleted' => 'Удален ли урок',
            'position' => 'Позиция'
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
        return $this->hasMany(Test::class, ['lesson_id' => 'id'])->andWhere(['is_deleted' => 0]);
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
     * @param $lesson
     * @param $currentLesson
     * @return array
     */
    public static function checkNextLesson( $currentLesson)
    {
        $role = \Yii::$app->user->identity->role;
        $currentCourse = Theme::find()
            ->leftJoin('course_chapter', 'course_chapter.id = course_theme.chapter_id')
            ->leftJoin('course', 'course.id = course_chapter.course_id')
            ->where(['course_theme.id' => $currentLesson->theme_id])
            ->select('course.id courseId')
            ->asArray()
            ->one();
        $lesson =  Lesson::find()
            ->leftJoin('course_theme', 'course_theme.id = course_lesson.theme_id')
            ->leftJoin('course_chapter', 'course_chapter.id = course_theme.chapter_id')
            ->orderBy('course_chapter.position ASC, course_theme.position ASC, course_lesson.position ASC')
            ->select('course_lesson.id lessonId, course_lesson.theme_id themeId, course_theme.position themePosition, course_chapter.position chapterPosition, course_lesson.position position, course_lesson.is_deleted isDeleted, course_lesson.status status, course_chapter.id chapterId')
            ->where(['course_chapter.course_id' => $currentCourse['courseId']])
            ->asArray()
            ->all();
        $nextLesson = null;
        $nextTheme = null;
        $nextChapter = null;
        $checkedLesson = null;
        foreach ($lesson as $lessonItem) {
            if ($role != 'admin' && !$nextLesson && !$lessonItem['isDeleted'] && $lessonItem['status'] == self::STATUS_PUBLISHED && $checkedLesson) {
                $nextLesson = $lessonItem['lessonId'];
                $nextTheme = $lessonItem['themeId'];
                $nextChapter = $lessonItem['chapterId'];
                $checkedLesson = null;
            }
            if($role == 'admin' && !$nextLesson && $checkedLesson){
                $nextLesson = $lessonItem['lessonId'];
                $nextTheme = $lessonItem['themeId'];
                $nextChapter = $lessonItem['chapterId'];
                $checkedLesson = null;
            }
            if((int)$lessonItem['lessonId'] === (int)$currentLesson->id)
            {
                $checkedLesson = true;
            }
        }

        return ['lesson' => $nextLesson ?? 'end', 'theme' => $nextTheme ?? 'end', 'chapter' => $nextChapter ?? 'end'];
    }

    public function getBreadCrumbs(): array
    {
        $result = [];
        $allLessons = Lesson::find()->where(['theme_id' => $this->theme_id])->all();
        $lessonCount = 0;
        foreach ($allLessons as $lesson) {
            $lessonCount++;
            if($lesson->id == $this->id) {
                $result['lesson']['id'] = $this->id;
                $result['lesson']['name'] = $this->title;
                $result['lesson']['position'] = $lessonCount;
            }
        }
        $result['lesson']['allQuantity'] = $lessonCount;
        $currentTheme = Theme::find()->where(['id' => $this->theme_id])->one();
        $allThemes = Theme::find()->where(['chapter_id' => $currentTheme->chapter_id])->all();
        $themeCount = 0;
        foreach ($allThemes as $theme) {
            $themeCount++;
            if($theme->id == $this->theme_id) {
                $result['theme']['id'] = $this->theme_id;
                $result['theme']['name'] = $this->theme->title;
                $result['theme']['position'] = $themeCount;
            }
        }
        $result['theme']['allQuantity'] = $themeCount;
        $currentChapter = Chapter::find()->where(['id' => $currentTheme->chapter_id])->one();
        $allChapters = Chapter::find()->where(['course_id' => $currentChapter->course_id])->all();
        $chapterCount = 0;
        foreach ($allChapters as $chapter) {
            $chapterCount++;
            if($chapter->id == $this->theme->chapter_id) {
                $result['chapter']['id'] = $this->theme->chapter_id;
                $result['chapter']['name'] = $this->theme->chapter->title;
                $result['chapter']['position'] = $chapterCount;
            }
        }
        $result['chapter']['allQuantity'] = $chapterCount;
        return $result;
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
        if ($this->scenario === Model::SCENARIO_DEFAULT && $this->description_autosave) {
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
