<?php

namespace app\components\actions;

use yii\base\Action;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class UpdateAction extends Action
{

    public $modelName;
    public $attributes = [];
    public $formName;

    public function run()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        /** @var ActiveRecord $model */
        $model = new $this->modelName();

        $formName = $this->formName ?? $model->formName();
        if ($formName !== '') {
            $id = $this->attributes[$formName]['id'] ?? null;
        } else {
            $id = $this->attributes['id'] ?? null;
        }


        $model = ($this->modelName)::findOne($id);
        if (!$model) {
            throw new NotFoundHttpException();
        }

        $model->load($this->attributes);
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
