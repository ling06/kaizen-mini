<?php

use yii\db\Migration;

/**
 * Class m231101_084326_add_is_deleted_column_to_tests
 */
class m231101_084326_add_is_deleted_column_to_tests extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('test', 'is_deleted', $this->boolean()->defaultValue(0));
        $this->addCommentOnColumn('test', 'is_deleted', 'Удален ли тест');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('test', 'is_deleted');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231101_084326_add_is_deleted_column_to_tests cannot be reverted.\n";

        return false;
    }
    */
}
