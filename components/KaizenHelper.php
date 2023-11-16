<?php

namespace app\components;

use app\modules\course\models\Chapter;
use app\modules\course\models\Lesson;
use app\modules\course\models\Theme;

class KaizenHelper
{

    public static function guidv4($data = null): string
    {
        $data = $data ?? random_bytes(16);
        assert(strlen($data) === 16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    public static function getServerName(): string
    {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on'
            ? 'https'
            : 'http';
        $host = $_SERVER['HTTP_HOST'];
        return $protocol . '://' . $host;
    }

    public static function setPosition($modelName, $id, $position = null)
    {
        switch ($modelName) {
            case Lesson::class:
                $parentName = 'theme_id';
                break;
            case Chapter::class:
                $parentName = 'course_id';
                break;
            case Theme::class:
                $parentName = 'chapter_id';
                break;
        }
        $model = $modelName::findOne($id);
        if ($position !== null) {
            $currentPositionModel = $modelName::find()->where(['position' => $position, $parentName => $model->{$parentName}])->one();
            if ($currentPositionModel) {
                $currentPositionModel->position = $model->position;
                $model->position = $position;
                $transaction = \Yii::$app->db->beginTransaction();
                try {
                    $model->save();
                    $currentPositionModel->save();
                    $transaction->commit();
                } catch (\Throwable $e) {
                    $transaction->rollBack();
                    throw $e;
                }
            } else {
                $model->position = $position;
                $model->save();
            }
        } else {
            $models = $modelName::find()->where([$parentName => $model->{$parentName}])->select('position')->orderBy('position')->asArray()->all();
            $position = 0;
            if(empty($models)) {
                $model->position = $position;
                $model->save();
            } else {
                foreach ($models as $thisModel) {
                    $position = $thisModel['position'];
                }
                $model->position = $position + 1;
                $model->save();
            }
        }
    }

}
