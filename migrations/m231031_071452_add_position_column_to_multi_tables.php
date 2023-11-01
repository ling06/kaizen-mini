<?php

use yii\db\Migration;

/**
 * Class m231031_071452_add_position_column_to_multi_tables
 */
class m231031_071452_add_position_column_to_multi_tables extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('course_chapter', 'position', $this->integer(11));
        $this->addColumn('course_theme', 'position', $this->integer(11));
        $this->addColumn('course_lesson', 'position', $this->integer(11));
        $this->addCommentOnColumn('course_chapter', 'position', 'Позиция главы');
        $this->addCommentOnColumn('course_theme', 'position', 'Позиция темы');
        $this->addCommentOnColumn('course_lesson', 'position', 'Позиция урока');

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('course_chapter', 'position');
        $this->dropColumn('course_theme', 'position');
        $this->dropColumn('course_lesson', 'position');
    }

}
