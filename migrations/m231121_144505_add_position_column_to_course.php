<?php

use app\modules\course\models\Course;
use yii\db\Migration;

/**
 * Class m231121_144505_add_position_column_to_course
 */
class m231121_144505_add_position_column_to_course extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('course', 'position', $this->integer(11));
        $this->addCommentOnColumn('course', 'position', 'Позиция курса');
        $courses = Course::find()->all();
        $position = 0;
        foreach ($courses as $course) {
            $course->position = $position;
            $position++;
            $course->save();
        }

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('course', 'position');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231121_144505_add_position_column_to_course cannot be reverted.\n";

        return false;
    }
    */
}
