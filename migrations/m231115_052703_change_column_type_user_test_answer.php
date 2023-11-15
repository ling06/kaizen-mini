<?php

use yii\db\Migration;

/**
 * Class m231115_052703_change_column_type_user_test_answer
 */
class m231115_052703_change_column_type_user_test_answer extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->dropForeignKey('user_test_answer_test_question_id_fkey', 'user_test_answer');
        $this->dropForeignKey('user_test_answer_user_id_fkey', 'user_test_answer');
        $this->dropPrimaryKey('user_test_answer_pkey', 'user_test_answer');
        $this->addForeignKey('user_test_answer_user_id_fkey', 'user_test_answer', 'user_id', 'user', 'id');
        $this->addForeignKey('user_test_answer_test_question_id_fkey', 'user_test_answer', 'test_question_id', 'test', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->addPrimaryKey('user_test_answer_pkey', 'user_test_answer', ['test_question_id', 'user_id']);
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231115_052703_change_column_type_user_test_answer cannot be reverted.\n";

        return false;
    }
    */
}
