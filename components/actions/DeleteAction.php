<?php

namespace app\components\actions;

use yii\base\Action;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class DeleteAction extends Action
{

    public $modelName;
    public $modelPk;
    public $isSoft = false;

    public function run()
    {
        /** @var ActiveRecord $model */
        $model = ($this->modelName)::findOne($this->modelPk);
        if (!$model) {
            throw new NotFoundHttpException();
        }

        if ($this->isSoft) {
            $result = $model->deleteSoft();
        } else {
            $result = $model->delete();
        }
        return ['result' => $result];
    }

}
