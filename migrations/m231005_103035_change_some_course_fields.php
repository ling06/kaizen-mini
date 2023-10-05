<?php

use yii\db\Migration;

/**
 * Class m231005_103035_change_some_course_fields
 */
class m231005_103035_change_some_course_fields extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->dropColumn('chapter', 'status');
        $this->dropColumn('theme', 'status');
        $this->addColumn('lesson', 'description_autosave', $this->text());
        $this->addCommentOnColumn('lesson', 'description_autosave', 'Автосохраненное описание');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('lesson', 'description_autosave');
        $this->addColumn('theme', 'status', $this->tinyInteger());
        $this->addCommentOnColumn('theme', 'status', 'Статус');
        $this->addColumn('chapter', 'status', $this->tinyInteger());
        $this->addCommentOnColumn('chapter', 'status', 'Статус');
    }

}
