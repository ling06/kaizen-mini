<?php

use yii\db\Migration;

/**
 * Class m231005_124103_rename_name_to_title
 */
class m231005_124103_rename_name_to_title extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->renameColumn('course', 'name', 'title');
        $this->renameColumn('chapter', 'name', 'title');
        $this->renameColumn('theme', 'name', 'title');
        $this->renameColumn('lesson', 'name', 'title');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->renameColumn('lesson', 'title', 'name');
        $this->renameColumn('theme', 'title', 'name');
        $this->renameColumn('chapter', 'title', 'name');
        $this->renameColumn('course', 'title', 'name');
    }

}
