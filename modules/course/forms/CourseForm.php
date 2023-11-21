<?php

namespace app\modules\course\forms;

use app\components\KaizenHelper;
use app\modules\course\models\Course;

class CourseForm extends Course
{
    public $newPosition;
    public function formName(): string
    {
        return '';
    }

    public function load($data, $formName = null): bool
    {
        $this->newPosition = $data['newPosition'] ?? null;
        return parent::load($data, $formName);
    }

    public function afterSave($insert, $changedAttributes): void
    {
        $model = Course::findOne($this->id);
        if ($this->position !== null) {
            $currentPositionModel = Course::find()->where(['position' => $this->newPosition])->one();
            if ($currentPositionModel) {
                $currentPositionModel->position = $model->position;
                $model->position = $this->newPosition;
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
                $model->position = $this->position;
                $model->save();
            }
        } else {
            $models = Course::find()->select('position')->orderBy('position')->asArray()->all();
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
        parent::afterSave($insert, $changedAttributes);
    }
}