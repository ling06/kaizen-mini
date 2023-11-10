<?php

use yii\db\Migration;

/**
 * Class m231110_084554_create_competitions
 */
class m231110_084554_create_competitions extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('competition', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'title' => $this->string(250)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'text' => $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'link' => $this->string(250)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'date' => $this->dateTime(),
            'status' => $this->integer(4),
            'is_deleted' => $this->boolean(),
        ]);
        $this->addForeignKey('competition_user_id_fkey', 'competition', 'user_id', 'user', 'id');
        $this->addCommentOnTable('competition', 'Новости');
        $this->addCommentOnColumn('competition', 'user_id', 'Id автора');
        $this->addCommentOnColumn('competition', 'title', 'Заголовок');
        $this->addCommentOnColumn('competition', 'text', 'Полный текст');
        $this->addCommentOnColumn('competition', 'link', 'Ссылка на Борбозу');
        $this->addCommentOnColumn('competition', 'date', 'Дата публикации');
        $this->addCommentOnColumn('competition', 'status', 'Статус');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('competition');
    }

}
