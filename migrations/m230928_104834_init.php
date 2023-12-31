<?php

use yii\db\Migration;

/**
 * Class m230928_104834_init
 */
class m230928_104834_init extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user', [
            'id' => $this->primaryKey(),
            'name' => $this->string(200)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'username' => $this->string(100),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user');
    }

}
