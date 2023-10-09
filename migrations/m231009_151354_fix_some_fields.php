<?php

use yii\db\Migration;

/**
 * Class m231009_151354_fix_some_fields
 */
class m231009_151354_fix_some_fields extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('test_question', 'is_open', $this->boolean());
        $this->addCommentOnColumn('test_question', 'is_open', 'Открытый ли вопрос');

        $this->renameColumn('image', 'modelName', 'model_name');
        $this->renameColumn('image', 'modelPk', 'model_pk');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->renameColumn('image', 'model_pk', 'modelPk');
        $this->renameColumn('image', 'model_name', 'modelName');
        $this->dropColumn('test_question', 'is_open');
    }

}
