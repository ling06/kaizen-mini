<?php

use yii\db\Migration;

/**
 * Class m231101_153758_add_is_deleted_column_to_test_question
 */
class m231101_153758_add_is_deleted_column_to_test_question extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('test_question', 'is_deleted', $this->boolean()->defaultValue(0));
        $this->addCommentOnColumn('test', 'is_deleted', 'Удален ли ответ');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('test_question', 'is_deleted');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231101_153758_add_is_deleted_column_to_test_question cannot be reverted.\n";

        return false;
    }
    */
}
