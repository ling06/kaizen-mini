<?php

namespace app\commands;

use app\modules\course\models\Chapter;
use app\modules\course\models\Course;
use app\modules\course\models\Lesson;
use app\modules\course\models\Theme;
use Yii;
use yii\console\Controller;

/**
 * Контроллер для создания записей в БД
 */
class MigrateDataController extends Controller
{

    public function actionIndex()
    {
        echo 'ok';
    }

    public function actionSetPositionsToCourse()
    {
        $courses = Course::find()->all();
        $transaction = Yii::$app->db->beginTransaction();
        foreach ($courses as $course) {
            $chpterPosition = Chapter::find()->where(['course_id' => $course->id])->all();
            $position = 0;
            foreach ($chpterPosition as $chapter) {
                $chapter->position = $position;
                try {
                    $chapter->save();
                    $position++;
                } catch (\Throwable $e) {
                    $transaction->rollBack();
                    throw $e;
                }
            }
        }
        $chapters = Chapter::find()->all();
        foreach ($chapters as $chapter) {
            $themePosition = Theme::find()->where(['chapter_id' => $chapter->id])->all();
            $position = 0;
            foreach ($themePosition as $theme) {
                $theme->position = $position;
                try {
                    $theme->save();
                    $position++;
                } catch (\Throwable $e) {
                    $transaction->rollBack();
                    throw $e;
                }
            }
        }
        $themes = Theme::find()->all();
        foreach ($themes as $theme) {
            $lessonPosition = Lesson::find()->where(['theme_id' => $theme->id])->all();
            $position = 0;
            foreach ($lessonPosition as $lesson) {
                $lesson->position = $position;
                try {
                    $lesson->save();
                    $position++;
                } catch (\Throwable $e) {
                    $transaction->rollBack();
                    throw $e;
                }
            }
        }
        $transaction->commit();
        return 'ok';

    }

}