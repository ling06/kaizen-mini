<?php

namespace app\modules\competition\controllers;

use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\RestoreAction;
use app\components\actions\UpdateAction;
use app\modules\competition\forms\CompetitionForm;
use Yii;
use app\components\actions\GetAllAction;
use app\components\actions\GetOneAction;
use app\modules\competition\models\Competition;
use yii\filters\AccessControl;
use app\components\ApiController;

class CompetitionController extends ApiController
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
                        'permissions' => [Competition::PERMISSION_CREATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['update'],
                        'permissions' => [Competition::PERMISSION_UPDATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['delete', 'restore'],
                        'permissions' => [Competition::PERMISSION_DELETE],
                    ],
                ],
            ]
        ];
    }

    public function actions(): array
    {
        $scopes = [];
        if (!Yii::$app->user->can(Competition::PERMISSION_UPDATE)) {
            $scopes[] = 'published';
        }
        if (!Yii::$app->user->can(Competition::PERMISSION_DELETE)) {
            $scopes[] = 'notDeleted';
        }

        return [
            'get-one' => [
                'class' => GetOneAction::class,
                'modelName' => Competition::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'get-all' => [
                'class' => GetAllAction::class,
                'modelName' => Competition::class,
                'page' => Yii::$app->request->get('page', 1),
                'scopes' => $scopes,
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelName' => CompetitionForm::class,
                'attributes' => Yii::$app->request->getBodyParams(),
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => CompetitionForm::class,
                'attributes' => Yii::$app->request->getBodyParams(),
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelName' => Competition::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
                'isSoft' => true,
            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => Competition::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
            ],
        ];
    }

}
