<?php

use yii\db\Migration;

/**
 * Class m231006_102133_change_course_table_names
 */
class m231006_102133_change_course_table_names extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->dropForeignKey('chapter_course_id_fkey', 'chapter');
        $this->dropForeignKey('chapter_user_id_fkey', 'chapter');
        $this->dropForeignKey('theme_chapter_id_fkey', 'theme');
        $this->dropForeignKey('theme_user_id_fkey', 'theme');
        $this->dropForeignKey('lesson_theme_id_fkey', 'lesson');
        $this->dropForeignKey('lesson_user_id_fkey', 'lesson');

        $this->renameTable('chapter', 'course_chapter');
        $this->renameTable('theme', 'course_theme');
        $this->renameTable('lesson', 'course_lesson');

        $this->addForeignKey('course_chapter_course_id_fkey', 'course_chapter', 'course_id', 'course', 'id');
        $this->addForeignKey('course_chapter_user_id_fkey', 'course_chapter', 'user_id', 'user', 'id');
        $this->addForeignKey('course_theme_chapter_id_fkey', 'course_theme', 'chapter_id', 'course_chapter', 'id');
        $this->addForeignKey('course_theme_user_id_fkey', 'course_theme', 'user_id', 'user', 'id');
        $this->addForeignKey('course_lesson_theme_id_fkey', 'course_lesson', 'theme_id', 'course_theme', 'id');
        $this->addForeignKey('course_lesson_user_id_fkey', 'course_lesson', 'user_id', 'user', 'id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('course_chapter_course_id_fkey', 'course_chapter');
        $this->dropForeignKey('course_chapter_user_id_fkey', 'course_chapter');
        $this->dropForeignKey('course_theme_chapter_id_fkey', 'course_theme');
        $this->dropForeignKey('course_theme_user_id_fkey', 'course_theme');
        $this->dropForeignKey('course_lesson_theme_id_fkey', 'course_lesson');
        $this->dropForeignKey('course_lesson_user_id_fkey', 'course_lesson');

        $this->renameTable('course_chapter', 'chapter');
        $this->renameTable('course_theme', 'theme');
        $this->renameTable('course_lesson', 'lesson');

        $this->addForeignKey('chapter_course_id_fkey', 'chapter', 'course_id', 'course', 'id');
        $this->addForeignKey('chapter_user_id_fkey', 'chapter', 'user_id', 'user', 'id');
        $this->addForeignKey('theme_chapter_id_fkey', 'theme', 'chapter_id', 'chapter', 'id');
        $this->addForeignKey('theme_user_id_fkey', 'theme', 'user_id', 'user', 'id');
        $this->addForeignKey('lesson_theme_id_fkey', 'lesson', 'theme_id', 'theme', 'id');
        $this->addForeignKey('lesson_user_id_fkey', 'lesson', 'user_id', 'user', 'id');
    }

}
