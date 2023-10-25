<?php

use yii\db\Migration;

/**
 * Class m231025_115154_change_test_question_column_name
 */
class m231025_115154_change_test_question_column_name extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->renameColumn('test_question', 'answers', 'answer');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->renameColumn('test_question', 'answer', 'answers');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231025_115154_change_test_question_column_name cannot be reverted.\n";

        return false;
    }
    */
}
