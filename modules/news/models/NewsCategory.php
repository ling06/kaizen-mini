<?php

namespace app\modules\news\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\queries\UserQuery;
use app\models\User;
use app\modules\news\models\queries\NewsCategoryQuery;
use app\modules\news\models\queries\NewsQuery;
use yii\behaviors\BlameableBehavior;

/**
 * This is the model class for table "news_category".
 *
 * @property int $id
 * @property int|null $user_id Id автора
 * @property string|null $title Заголовок
 * @property bool $is_deleted [tinyint(1)]
 *
 * @property User $user
 * @property NewsCategories[] $newsCategories
 * @property News[] $news
 */
class NewsCategory extends \yii\db\ActiveRecord
{

    public const PERMISSION_CREATE = 'news-category-create';
    public const PERMISSION_UPDATE = 'news-category-update';
    public const PERMISSION_DELETE = 'news-category-delete';

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'news_category';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['title'], 'string', 'max' => 250],
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
            'user_id' => 'Id автора',
            'title' => 'Заголовок',
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
     * @return \yii\db\ActiveQuery
     */
    public function getNewsCategories(): \yii\db\ActiveQuery
    {
        return $this->hasMany(NewsCategories::class, ['news_category_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery|NewsQuery
     */
    public function getNews(): NewsQuery
    {
        return $this->hasMany(News::class, ['news_id' => 'id'])->via('newsCategories');
    }

    /**
     * {@inheritdoc}
     * @return NewsCategoryQuery the active query used by this AR class.
     */
    public static function find(): NewsCategoryQuery
    {
        return new NewsCategoryQuery(static::class);
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
