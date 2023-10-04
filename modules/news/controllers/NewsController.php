<?php

namespace app\modules\news\controllers;

use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\RestoreAction;
use app\components\actions\UpdateAction;
use app\modules\news\models\NewsCategories;
use app\modules\news\models\NewsCategory;
use Yii;
use app\components\actions\GetAllAction;
use app\components\actions\GetOneAction;
use app\modules\news\models\News;
use yii\filters\AccessControl;
use yii\web\Controller;

class NewsController extends Controller
{

    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['get-one', 'get-all'],
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['create'],
                        'permissions' => [News::PERMISSION_CREATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['update'],
                        'permissions' => [News::PERMISSION_UPDATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['delete', 'restore'],
                        'permissions' => [News::PERMISSION_DELETE],
                    ],
                ],
            ]
        ];
    }

    public function beforeAction($action): bool
    {
        $this->enableCsrfValidation = (YII_ENV === 'prod');
        return parent::beforeAction($action);
    }

    public function actions(): array
    {
        $newsModel = new News();
        $scopes = [];
        if (!Yii::$app->user->can(News::PERMISSION_UPDATE)) {
            $scopes[] = 'published';
        }
        if (!Yii::$app->user->can(News::PERMISSION_DELETE)) {
            $scopes[] = 'notDeleted';
        }

        return [
            'get-one' => [
                'class' => GetOneAction::class,
                'modelName' => News::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'get-all' => [
                'class' => GetAllAction::class,
                'modelName' => News::class,
                'page' => Yii::$app->request->get('page', 1),
                'scopes' => $scopes,
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelName' => News::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => News::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelName' => News::class,
                'modelPk' => Yii::$app->request->post($newsModel->formName())['id'] ?? null,
                'isSoft' => true,
            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => News::class,
                'modelPk' => Yii::$app->request->post($newsModel->formName())['id'] ?? null,
            ],
        ];
    }

}
