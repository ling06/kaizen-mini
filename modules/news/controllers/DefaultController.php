<?php

namespace app\modules\news\controllers;

use app\components\actions\GetAllAction;
use app\components\actions\GetOneAction;
use app\modules\news\models\News;
use yii\filters\AccessControl;
use yii\web\Controller;

class DefaultController extends Controller
{

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [],
            ]
        ];
    }

    public function actions(): array
    {
        return [
            'get-one' => [
                'class' => GetOneAction::class,
                'modelName' => News::class,
                'modelPk' => \Yii::$app->request->get('id'),
                'scopes' => \Yii::$app->user->can(News::PERMISSION_UPDATE)
                    ? []
                    : ['published'],
            ],
            'get-all' => [
                'class' => GetAllAction::class,
                'modelName' => News::class,
                'page' => \Yii::$app->request->get('page', 1),
                'scopes' => \Yii::$app->user->can(News::PERMISSION_UPDATE)
                    ? []
                    : ['published'],
            ],
        ];
    }

}
