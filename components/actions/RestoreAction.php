<?php

namespace app\components\actions;

use yii\base\Action;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class RestoreAction extends Action
{

    public $modelName;
    public $modelPk;

    public function run()
    {
        /** @var ActiveRecord $model */
        $model = ($this->modelName)::findOne($this->modelPk);
        if (!$model) {
            throw new NotFoundHttpException();
        }

        return [
            'result' => $model->restore(),
        ];
    }

}
