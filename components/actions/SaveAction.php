<?php

namespace app\components\actions;

use yii\base\Action;
use yii\db\ActiveQuery;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class SaveAction extends Action
{

    public $modelName;
    public $fields;

    public function run()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;

        /** @var ActiveQuery $query */
        $query = ($this->modelName)::find($this->id);
        if ($this->fields) {
            $query->select($this->fields);
        }

        return $result;
    }

}
