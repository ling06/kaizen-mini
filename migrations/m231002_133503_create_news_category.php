<?php

use yii\db\Migration;

/**
 * Class m231002_133503_create_news_category
 */
class m231002_133503_create_news_category extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('news_category', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'title' => $this->string(100),
            'is_deleted' => $this->boolean(),
        ]);
        $this->addCommentOnTable('news_category', 'Категории новостей');
        $this->addCommentOnColumn('news_category', 'user_id', 'Id создателя');
        $this->addCommentOnColumn('news_category', 'title', 'Название');
        $this->addForeignKey('news_category_user_id_fkey', 'news_category', 'user_id', 'user', 'id');

        $this->createTable('news_categories', [
            'news_id' => $this->integer(),
            'news_category_id' => $this->integer(),
        ]);
        $this->addPrimaryKey('news_categories_pkey', 'news_categories', ['news_id', 'news_category_id']);
        $this->addCommentOnTable('news_categories', 'Привязка категорий к новостям');
        $this->addCommentOnColumn('news_categories', 'news_id', 'Id новости');
        $this->addCommentOnColumn('news_categories', 'news_category_id', 'Id категории');
        $this->addForeignKey('news_categories_news_id_fkey', 'news_categories', 'news_id', 'news', 'id');
        $this->addForeignKey('news_categories_news_category_id_fkey', 'news_categories', 'news_category_id', 'news_category', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('news_categories');
        $this->dropTable('news_category');
    }

}
