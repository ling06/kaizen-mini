<?php

use yii\db\Migration;

/**
 * Class m231002_072926_add_soft_delete_to_news
 */
class m231002_072926_add_soft_delete_to_news extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('news', 'is_deleted', $this->boolean());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('news', 'is_deleted');
    }

}
