<?php

namespace app\controllers;

use Yii;
use app\components\ApiController;
use yii\web\Response;

class UserController extends ApiController
{

    public function actionWhoami()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        if (Yii::$app->user->isGuest) return [];
        return [
            'user' => Yii::$app->user->identity->toArray(),
            'permissions' => array_keys(Yii::$app->authManager->getPermissionsByUser(Yii::$app->user->id)),
        ];
    }

}