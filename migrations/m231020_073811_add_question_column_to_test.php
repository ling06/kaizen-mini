<?php

use yii\db\Migration;

/**
 * Class m231020_073811_add_comment_column_to_test_question
 */
class m231020_073811_add_question_column_to_test extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('test', 'question', $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'));
        $this->addCommentOnColumn('test', 'question', 'Вопрос');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('test_question', 'comment');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231020_073811_add_comment_column_to_test_question cannot be reverted.\n";

        return false;
    }
    */
}
