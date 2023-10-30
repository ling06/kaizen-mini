<?php

use yii\db\Migration;

/**
 * Class m231027_091117_create_editor_js_images
 */
class m231027_091117_create_editor_js_images extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable( 'editor_js_images', [
            'id'=> $this->primaryKey(),
            'model_type' => $this->string(250),
            'model_id' => $this->integer(11),
            'user_id' => $this->integer(11),
            'url' => $this->string(250),
            'date' => $this->dateTime()
        ]);
        $this->addCommentOnTable('editor_js_images', 'Таблица для изображений, котоые используются в editorJs');
        $this->addCommentOnColumn('editor_js_images', 'model_type', 'Модель, где используется editorJs');
        $this->addCommentOnColumn('editor_js_images', 'model_id', 'ID модели, в которой используется editorJs');
        $this->addCommentOnColumn('editor_js_images', 'user_id', 'ID пользователя добавившего изображение');
        $this->addCommentOnColumn('editor_js_images', 'url', 'Путь к файлу с именем самого файла');
        $this->addCommentOnColumn('editor_js_images', 'date', 'Дата добавленя изображения');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('editor_js_images');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m231027_091117_create_editor_js_images cannot be reverted.\n";

        return false;
    }
    */
}
