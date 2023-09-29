<?php

namespace app\components;

use app\models\User;
use Yii;

class Controller extends \yii\web\Controller
{

    public function beforeAction($action): bool
    {
        if (!Yii::$app->user->isGuest) {
            User::updateAll(['lastAction' => date('Y-m-d H:i:s')], ['id' => Yii::$app->user->id]);
        }
        return parent::beforeAction($action);
    }

}