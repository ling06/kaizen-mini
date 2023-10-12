<?php

namespace app\modules\news\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\queries\UserQuery;
use app\models\User;
use app\modules\news\models\queries\NewsCategoryQuery;
use app\modules\news\models\queries\NewsQuery;
use yii\behaviors\BlameableBehavior;
use yii\db\ActiveQuery;

/**
 * This is the model class for table "news".
 *
 * @property int $id
 * @property int|null $user_id Id автора
 * @property string|null $title Заголовок
 * @property string|null $text Полный текст
 * @property string|null $date Дата публикации
 * @property int $status [int(4)]  Статус
 * @property bool $is_deleted [tinyint(1)]
 *
 * @property User $user
 * @property NewsCategories[] $newsCategories
 * @property NewsCategory[] $categories
 */
class News extends \app\components\ActiveRecord
{

    public const PERMISSION_READ = 'news-read';
    public const PERMISSION_CREATE = 'news-create';
    public const PERMISSION_UPDATE = 'news-update';
    public const PERMISSION_DELETE = 'news-delete';

    public const STATUS_DRAFT = 0;
    public const STATUS_PUBLISHED = 1;

    public static function getExtraFields(): array
    {
        return [
            'categories' => 'categories',
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
        return 'news';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['status'], 'in', 'range' => [static::STATUS_DRAFT, static::STATUS_PUBLISHED]],
            [['text'], 'string'],
            [['date'], 'safe'],
            [['title'], 'string', 'max' => 250],
            [['is_deleted'], 'boolean'],
            [['status'], 'default', 'value' => static::STATUS_DRAFT],
            [['date'], 'default', 'value' => date('Y-m-d H:i:s')],
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
            'user_id' => 'Id автора',
            'title' => 'Заголовок',
            'text' => 'Полный текст',
            'date' => 'Дата публикации',
            'status' => 'Статус',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery|UserQuery
     */
    public function getUser(): UserQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return NewsQuery the active query used by this AR class.
     */
    public static function find(): NewsQuery
    {
        return new NewsQuery(static::class);
    }

    /**
     * @return NewsCategoryQuery
     */
    public function getCategories(): ActiveQuery
    {
        return $this->hasMany(NewsCategory::class, ['id' => 'news_category_id'])->via('newsCategories');
    }

    /**
     * @return NewsCategoryQuery
     */
    public function getNewsCategories(): ActiveQuery
    {
        return $this->hasMany(NewsCategories::class, ['news_id' => 'id']);
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
