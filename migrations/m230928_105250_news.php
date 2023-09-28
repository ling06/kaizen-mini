<?php

use yii\db\Migration;

/**
 * Class m230928_105250_news
 */
class m230928_105250_news extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('news', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'title' => $this->string(250),
            'text' => $this->text(),
            'date' => $this->dateTime(),
        ]);
        $this->addForeignKey('news_user_id_fkey', 'news', 'user_id', 'user', 'id');
        $this->addCommentOnTable('news', 'Новости');
        $this->addCommentOnColumn('news', 'user_id', 'Id автора');
        $this->addCommentOnColumn('news', 'title', 'Заголовок');
        $this->addCommentOnColumn('news', 'text', 'Полный текст');
        $this->addCommentOnColumn('news', 'date', 'Дата публикации');

        $this->createTable('log', [
            'id' => $this->primaryKey(),
            'date' => $this->dateTime(),
            'user_id' => $this->integer(),
            'modelClass' => $this->string(250),
            'modelPk' => $this->string(20),
            'oldAttributes' => $this->text(),
            'newAttributes' => $this->text(),
        ]);
        $this->addForeignKey('logs_user_id_fkey', 'log', 'user_id', 'user', 'id');
        $this->addCommentOnTable('log', 'Логи изменений');
        $this->addCommentOnColumn('log', 'date', 'Дата изменения');
        $this->addCommentOnColumn('log', 'user_id', 'Id автора');
        $this->addCommentOnColumn('log', 'modelClass', 'Класс измененной модели');
        $this->addCommentOnColumn('log', 'modelPk', 'Primary key измененной модели');
        $this->addCommentOnColumn('log', 'oldAttributes', 'Атрибуты модели до изменения, json');
        $this->addCommentOnColumn('log', 'newAttributes', 'Атрибуты модели после изменения, json');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('log');
        $this->dropTable('news');
    }

}
