<?php

use yii\db\Migration;

/**
 * Class m231030_054619_change_users_answer_column_name
 */
class m231030_054619_change_users_answer_column_name extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->alterColumn('user_test_answer', 'answer', $this->integer(11));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->alterColumn('user_test_answer', 'answer', $this->text());
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231030_054619_change_users_answer_column_name cannot be reverted.\n";

        return false;
    }
    */
}
