<?php

namespace app\modules\news\controllers;

use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\RestoreAction;
use app\components\actions\UpdateAction;
use app\modules\news\models\NewsCategory;
use Yii;
use app\components\actions\GetAllAction;
use app\components\actions\GetOneAction;
use app\modules\news\models\News;
use yii\filters\AccessControl;
use yii\web\Controller;

class CategoryController extends Controller
{

    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['get-all'],
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['create'],
                        'permissions' => [NewsCategory::PERMISSION_CREATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['update'],
                        'permissions' => [NewsCategory::PERMISSION_UPDATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['delete', 'restore'],
                        'permissions' => [NewsCategory::PERMISSION_DELETE],
                    ],
                ],
            ]
        ];
    }

    public function actions(): array
    {
        $scopes = [];
        if (!Yii::$app->user->can(NewsCategory::PERMISSION_DELETE)) {
            $scopes[] = 'notDeleted';
        }

        return [
            'get-all' => [
                'class' => GetAllAction::class,
                'modelName' => NewsCategory::class,
                'scopes' => $scopes,
                'pageSize' => 10000,
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelName' => NewsCategory::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => NewsCategory::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelName' => NewsCategory::class,
                'modelPk' => Yii::$app->request->post('id'),
                'isSoft' => true,
            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => NewsCategory::class,
                'modelPk' => Yii::$app->request->post('id'),
            ],
        ];
    }

}