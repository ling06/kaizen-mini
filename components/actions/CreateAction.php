<?php

namespace app\components\actions;

use yii\base\Action;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class CreateAction extends Action
{

    public $modelName;
    public $attributes = [];
    public $formName;

    public function run()
    {
        /** @var ActiveRecord $model */
        $model = new $this->modelName();
        $model->load($this->attributes, $this->formName);
        $model->save();

        if ($model->hasErrors()) {
            $result = [
                'result' => false,
                'data' => $model->errors,
            ];
        } else {
            $result = [
                'result' => true,
                'data' => $model->toArray(),
            ];
        }

        return $result;
    }

}
