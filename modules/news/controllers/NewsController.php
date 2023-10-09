<?php

namespace app\modules\news\controllers;

use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\RestoreAction;
use app\components\actions\UpdateAction;
use app\modules\news\forms\NewsForm;
use app\modules\news\models\queries\NewsQuery;
use Yii;
use app\components\actions\GetAllAction;
use app\components\actions\GetOneAction;
use app\modules\news\models\News;
use yii\filters\AccessControl;
use app\components\Controller;

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
        $scopes = [];
        if (!Yii::$app->user->can(News::PERMISSION_UPDATE)) {
            $scopes[] = 'published';
        }
        if (!Yii::$app->user->can(News::PERMISSION_DELETE)) {
            $scopes[] = 'notDeleted';
        }

        if ($categoryId = (int)Yii::$app->request->get('category')) {
            $scopes[] = static function (NewsQuery $query) use ($categoryId) {
                $query->category($categoryId);
            };
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
                'with' => ['categories'],
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelName' => NewsForm::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => NewsForm::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelName' => News::class,
                'modelPk' => Yii::$app->request->post('id'),
                'isSoft' => true,
            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => News::class,
                'modelPk' => Yii::$app->request->post('id'),
            ],
        ];
    }

}
