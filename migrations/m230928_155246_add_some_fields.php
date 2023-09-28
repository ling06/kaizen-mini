<?php

use yii\db\Migration;

/**
 * Class m230928_155246_add_some_fields
 */
class m230928_155246_add_some_fields extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('user', 'role', $this->string(50));
        $this->addColumn('user', 'isActive', $this->boolean());
        $this->addColumn('user', 'lastAction', $this->dateTime());
        $this->addCommentOnColumn('user', 'role', 'Роль');
        $this->addCommentOnColumn('user', 'isActive', 'Активен ли пользователь');
        $this->addCommentOnColumn('user', 'lastAction', 'Дата последнего действия');

        $this->addColumn('news', 'status', $this->integer(4));
        $this->addCommentOnColumn('news', 'status', 'Статус');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('news', 'status');
        $this->dropColumn('user', 'lastAction');
        $this->dropColumn('user', 'isActive');
        $this->dropColumn('user', 'role');
    }

}
