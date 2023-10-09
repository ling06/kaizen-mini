<?php

namespace app\components;

use app\models\User;
use Yii;
use yii\db\ActiveRecord;
use yii\web\NotFoundHttpException;

class Controller extends \yii\web\Controller
{

    public function findModel(string $modelName, int $id): ActiveRecord
    {
        $model = $modelName::findOne($id);
        if (!$model) {
            throw new NotFoundHttpException();
        }
        return $model;
    }

    public function beforeAction($action): bool
    {
        if (!Yii::$app->user->isGuest) {
            User::updateAll(['lastAction' => date('Y-m-d H:i:s')], ['id' => Yii::$app->user->id]);
        }
        return parent::beforeAction($action);
    }

}