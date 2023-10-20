<?php

use yii\db\Migration;

/**
 * Class m231006_091825_create_tests
 */
class m231006_091825_create_tests extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('test', [
            'id' => $this->primaryKey(),
            'lesson_id' => $this->integer(),
            'is_active' => $this->boolean(),
            'user_id' => $this->integer(),
            'date' => $this->dateTime(),
        ]);
        $this->addForeignKey('test_lesson_id_fkey', 'test', 'lesson_id', 'lesson', 'id');
        $this->addForeignKey('test_user_id_fkey', 'test', 'user_id', 'user', 'id');
        $this->addCommentOnTable('test', 'Тесты');
        $this->addCommentOnColumn('test', 'lesson_id', 'Id урока');
        $this->addCommentOnColumn('test', 'is_active', 'Активен ли тест');
        $this->addCommentOnColumn('test', 'user_id', 'Id автора');
        $this->addCommentOnColumn('test', 'date', 'Дата создания');

        $this->createTable('test_question', [
            'id' => $this->primaryKey(),
            'test_id' => $this->integer(),
            'text' => $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'answers' => $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'right_answer' => $this->text()->append('CHARACTER SET utf8 COLLATE utf8_unicode_ci'),
            'user_id' => $this->integer(),
            'date' => $this->dateTime(),
        ]);
        $this->addForeignKey('test_question_test_id_fkey', 'test_question', 'test_id', 'test', 'id');
        $this->addForeignKey('test_question_user_id_fkey', 'test_question', 'user_id', 'user', 'id');
        $this->addCommentOnTable('test_question', 'Вопросы тестов');
        $this->addCommentOnColumn('test_question', 'test_id', 'Id теста');
        $this->addCommentOnColumn('test_question', 'text', 'Текст вопроса');
        $this->addCommentOnColumn('test_question', 'answers', 'Варианты ответов, json');
        $this->addCommentOnColumn('test_question', 'right_answer', 'Правильный ответ');
        $this->addCommentOnColumn('test_question', 'user_id', 'Id автора');
        $this->addCommentOnColumn('test_question', 'date', 'Дата создания');

        $this->createTable('user_test_answer', [
            'test_question_id' => $this->integer(),
            'user_id' => $this->integer(),
            'answer' => $this->text(),
            'is_right' => $this->tinyInteger(),
            'date' => $this->dateTime(),
        ]);
        $this->addPrimaryKey('user_test_answer_pkey', 'user_test_answer', ['test_question_id', 'user_id']);
        $this->addForeignKey('user_test_answer_test_question_id_fkey', 'user_test_answer', 'test_question_id', 'test_question', 'id');
        $this->addForeignKey('user_test_answer_user_id_fkey', 'user_test_answer', 'user_id', 'user', 'id');
        $this->addCommentOnTable('user_test_answer', 'Ответы пользователей на вопросы тестов');
        $this->addCommentOnColumn('user_test_answer', 'test_question_id', 'Id вопроса');
        $this->addCommentOnColumn('user_test_answer', 'user_id', 'Id отвечающего');
        $this->addCommentOnColumn('user_test_answer', 'answer', 'Ответ');
        $this->addCommentOnColumn('user_test_answer', 'is_right', 'Правильность ответа');
        $this->addCommentOnColumn('user_test_answer', 'date', 'Дата ответа');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('user_test_answer');
        $this->dropTable('test_question');
        $this->dropTable('test');
    }

}
