<?php

use yii\db\Migration;

/**
 * Class m231003_111414_create_courses
 */
class m231003_111414_create_courses extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('image', [
            'id' => $this->primaryKey(),
            'server' => $this->string(200),
            'directory' => $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'name' => $this->string(200)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'original_name' => $this->string(200)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'user_id' => $this->integer(),
            'date' => $this->dateTime(),
            'modelName' => $this->string(200),
            'modelPk' => $this->string(50),
            'type' => $this->string(50),
            'is_deleted' => $this->boolean()->defaultValue(0),
        ]);
        $this->addCommentOnTable('image', 'Изображения');
        $this->addCommentOnColumn('image', 'server', 'Сервер где хранится изображение');
        $this->addCommentOnColumn('image', 'directory', 'Директория изображения');
        $this->addCommentOnColumn('image', 'name', 'Имя файла изображения');
        $this->addCommentOnColumn('image', 'original_name', 'Оригинальное название изображения');
        $this->addCommentOnColumn('image', 'user_id', 'Id пользователя, загрузившего изображение');
        $this->addCommentOnColumn('image', 'date', 'Дата загрузки');
        $this->addCommentOnColumn('image', 'modelName', 'Модель, для которой предназначается изображение');
        $this->addCommentOnColumn('image', 'modelPk', 'Id модели, для которой предназначается изображение');
        $this->addCommentOnColumn('image', 'type', 'Тип изображения');
        $this->addCommentOnColumn('image', 'is_deleted', 'Удалено ли изображение');
        $this->addForeignKey('image_user_id_fkey', 'image', 'user_id', 'user', 'id');

        $this->createTable('course', [
            'id' => $this->primaryKey(),
            'name' => $this->string(200),
            'description' => $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'is_open' => $this->boolean()->defaultValue(1),
            'status' => $this->tinyInteger()->defaultValue(0),
            'user_id' => $this->integer(),
            'date' => $this->dateTime(),
            'is_deleted' => $this->boolean()->defaultValue(0),
        ]);
        $this->addCommentOnTable('course', 'Курсы');
        $this->addCommentOnColumn('course', 'name', 'Название');
        $this->addCommentOnColumn('course', 'description', 'Описание');
        $this->addCommentOnColumn('course', 'is_open', 'Все ли главы доступны сразу');
        $this->addCommentOnColumn('course', 'status', 'Статус');
        $this->addCommentOnColumn('course', 'user_id', 'Id создателя');
        $this->addCommentOnColumn('course', 'date', 'Дата создания');
        $this->addCommentOnColumn('course', 'is_deleted', 'Удален ли курс');
        $this->addForeignKey('course_user_id_fkey', 'course', 'user_id', 'user', 'id');

        $this->createTable('chapter', [
            'id' => $this->primaryKey(),
            'course_id' => $this->integer(),
            'name' => $this->string(200)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'status' => $this->tinyInteger()->defaultValue(0),
            'user_id' => $this->integer(),
            'date' => $this->dateTime(),
            'is_deleted' => $this->boolean()->defaultValue(0),
        ]);
        $this->addCommentOnTable('chapter', 'Главы');
        $this->addCommentOnColumn('chapter', 'course_id', 'Id курса');
        $this->addCommentOnColumn('chapter', 'name', 'Название');
        $this->addCommentOnColumn('chapter', 'status', 'Статус');
        $this->addCommentOnColumn('chapter', 'user_id', 'Id создателя');
        $this->addCommentOnColumn('chapter', 'date', 'Дата создания');
        $this->addCommentOnColumn('chapter', 'is_deleted', 'Удалена ли глава');
        $this->addForeignKey('chapter_course_id_fkey', 'chapter', 'course_id', 'course', 'id');
        $this->addForeignKey('chapter_user_id_fkey', 'chapter', 'user_id', 'user', 'id');

        $this->createTable('theme', [
            'id' => $this->primaryKey(),
            'chapter_id' => $this->integer(),
            'name' => $this->string(200)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'status' => $this->tinyInteger()->defaultValue(0),
            'user_id' => $this->integer(),
            'date' => $this->dateTime(),
            'is_deleted' => $this->boolean()->defaultValue(0),
        ]);
        $this->addCommentOnTable('theme', 'Темы');
        $this->addCommentOnColumn('theme', 'chapter_id', 'Id главы');
        $this->addCommentOnColumn('theme', 'name', 'Название');
        $this->addCommentOnColumn('theme', 'status', 'Статус');
        $this->addCommentOnColumn('theme', 'user_id', 'Id создателя');
        $this->addCommentOnColumn('theme', 'date', 'Дата создания');
        $this->addCommentOnColumn('theme', 'is_deleted', 'Удалена ли тема');
        $this->addForeignKey('theme_chapter_id_fkey', 'theme', 'chapter_id', 'chapter', 'id');
        $this->addForeignKey('theme_user_id_fkey', 'theme', 'user_id', 'user', 'id');

        $this->createTable('lesson', [
            'id' => $this->primaryKey(),
            'theme_id' => $this->integer(),
            'name' => $this->string(200)->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'description' => $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'status' => $this->tinyInteger()->defaultValue(0),
            'user_id' => $this->integer(),
            'date' => $this->dateTime(),
            'is_deleted' => $this->boolean()->defaultValue(0),
        ]);
        $this->addCommentOnTable('lesson', 'Уроки');
        $this->addCommentOnColumn('lesson', 'theme_id', 'Id темы');
        $this->addCommentOnColumn('lesson', 'name', 'Название');
        $this->addCommentOnColumn('lesson', 'description', 'Описание');
        $this->addCommentOnColumn('lesson', 'status', 'Статус');
        $this->addCommentOnColumn('lesson', 'user_id', 'Id создателя');
        $this->addCommentOnColumn('lesson', 'date', 'Дата создания');
        $this->addCommentOnColumn('lesson', 'is_deleted', 'Удален ли урок');
        $this->addForeignKey('lesson_theme_id_fkey', 'lesson', 'theme_id', 'theme', 'id');
        $this->addForeignKey('lesson_user_id_fkey', 'lesson', 'user_id', 'user', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('lesson');
        $this->dropTable('theme');
        $this->dropTable('chapter');
        $this->dropTable('course');
        $this->dropTable('image');
    }

}
