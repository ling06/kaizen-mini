<?php

namespace app\modules\news\models;

use app\modules\news\models\queries\NewsCategoryQuery;
use app\modules\news\models\queries\NewsQuery;

/**
 * This is the model class for table "news_categories".
 *
 * @property int $news_id
 * @property int|null $news_category_id
 *
 * @property News $news
 * @property NewsCategory $newsCategory
 */
class NewsCategories extends \app\components\ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'news_categories';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            ['news_id', 'exist', 'targetClass' => News::class, 'targetAttribute' => 'id'],
            ['news_category_id', 'exist', 'targetClass' => NewsCategory::class, 'targetAttribute' => 'id'],
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery|NewsQuery
     */
    public function getNews(): NewsQuery
    {
        return $this->hasOne(News::class, ['id' => 'news_id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery|NewsCategoryQuery
     */
    public function getNewsCategory(): NewsCategoryQuery
    {
        return $this->hasOne(NewsCategory::class, ['id' => 'news_category_id']);
    }

}
