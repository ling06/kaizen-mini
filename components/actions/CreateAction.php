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
    public $with = [];

    public function run()
    {
        $modelName = $this->modelName;

        /** @var ActiveRecord $model */
        $model = new $modelName();
        $model->load($this->attributes, $this->formName);
        $model->save();

        if ($model->hasErrors()) {
            $result = [
                'result' => false,
                'data' => $model->errors,
            ];
        } else {
            $query = $modelName::find()
                ->where([$modelName::primaryKey()[0] => $model->primaryKey]);
            if ($this->with) {
                $query->with($this->with);
            }
            $result = [
                'result' => true,
//                'data' => $query->asArray()->one(),
                'data' => $query->one(),
            ];
        }

        return $result;
    }

}
