<?php

namespace app\modules\course\forms;

use app\components\KaizenHelper;
use app\modules\course\models\Course;

class CourseForm extends Course
{

    public function formName(): string
    {
        return '';
    }

    public function load($data, $formName = null): bool
    {
        return parent::load($data, $formName);
    }

    public function afterSave($insert, $changedAttributes): void
    {
        $model = Course::findOne($this->id);
        if ($model->position === null) {
            $models = Course::find()->select('position')->orderBy('position')->asArray()->all();
            $position = 0;
            if (empty($models)) {
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