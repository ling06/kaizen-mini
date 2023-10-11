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
    public $with = [];

    public function run()
    {
        $modelName = $this->modelName;

        /** @var ActiveRecord $model */
        $model = new $modelName();

        $formName = $this->formName ?? $model->formName();
        if ($formName !== '') {
            $id = $this->attributes[$formName]['id'] ?? null;
        } else {
            $id = $this->attributes['id'] ?? null;
        }

        $model = $modelName::findOne($id);
        if (!$model) {
            throw new NotFoundHttpException();
        }
        $model->load($this->attributes, $formName);
        $model->save();

        if ($model->hasErrors()) {
            $result = [
                'result' => false,
                'data' => $model->errors,
            ];
        } else {
            $query = $modelName::find()
                ->where([$modelName::primaryKey() => $model->primaryKey]);
            if ($this->with) {
                $query->with($this->with);
            }
            $result = [
                'result' => true,
                'data' => $query->asArray()->one(),
            ];
        }

        return $result;
    }

}
