<?php

use yii\db\Migration;

/**
 * Class m231030_102559_change_foreing_key_users_answer
 */
class m231030_102559_change_foreing_key_users_answer extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->dropForeignKey('user_test_answer_test_question_id_fkey', 'user_test_answer');
        $this->addForeignKey('user_test_answer_test_question_id_fkey', 'user_test_answer', 'test_question_id', 'test', 'id');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('user_test_answer_test_question_id_fkey', 'user_test_answer');
        $this->addForeignKey('user_test_answer_test_question_id_fkey', 'user_test_answer', 'test_question_id', 'test_question', 'id');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231030_102559_change_foreing_key_users_answer cannot be reverted.\n";

        return false;
    }
    */
}
