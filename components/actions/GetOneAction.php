<?php

namespace app\components\actions;

use yii\base\Action;
use yii\db\ActiveQuery;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class GetOneAction extends Action
{

    public $modelName;
    public $modelPk;
    public $fields;
    public $scopes = [];
    public $with = [];

    public function run()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;

        $modelName = $this->modelName;

        /** @var ActiveQuery $query */
        $query = $modelName::find()->where([$modelName::primaryKey()[0] => $this->modelPk]);
        if ($this->fields) {
            $query->select($this->fields);
        }
        foreach ($this->scopes as $scope) {
            if (is_callable($scope)) {
                $scope($query);
            } elseif (is_string($scope)) {
                $query->$scope();
            }
        }
        if ($this->with) {
            $query->with($this->with);
        }
        $model = $query->asArray()->one();

        if (!$model) {
            \Yii::$app->response->statusCode = 404;
            throw new NotFoundHttpException();
        }

        return [
            'result' => true,
            'data' => $model,
        ];
    }

}
