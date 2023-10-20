<?php

use yii\db\Migration;

/**
 * Class m231009_092636_user_checks
 */
class m231009_092636_user_checks extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user_check', [
            'user_id' => $this->integer(),
            'model_name' => $this->string(190)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'model_pk' => $this->integer(50),
        ]);
        $this->addPrimaryKey('user_check_pkey', 'user_check', ['user_id', 'model_name', 'model_pk']);
        $this->addForeignKey('user_check_user_id_fkey', 'user_check', 'user_id', 'user', 'id');
        $this->addCommentOnTable('user_check', 'Отметки о прочтении');
        $this->addCommentOnColumn('user_check', 'user_id', 'Id пользователя');
        $this->addCommentOnColumn('user_check', 'model_name', 'Прочтенная модель');
        $this->addCommentOnColumn('user_check', 'model_pk', 'Id прочтенной модели');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user_check');
    }

}
