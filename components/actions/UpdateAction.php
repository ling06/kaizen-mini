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
    public $relations = [];

    public function run()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        /** @var ActiveRecord $model */
        $model = new $this->modelName();

        $id = $this->attributes[$this->formName ?? $model->formName()]['id'] ?? null;
        $model = ($this->modelName)::findOne($id);
        if (!$model) {
            throw new NotFoundHttpException();
        }

        $model->load($this->attributes);
        foreach ($this->relations as $relationName => $relationClass) {
            $relationModel = new $relationClass();
            $model->setRelationData($relationName, $this->attributes[$relationModel->formName()] ?? []);
        }
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
