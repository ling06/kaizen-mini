<?php

namespace app\modules\course\controllers;

use app\modules\course\models\Chapter;
use app\modules\course\models\Lesson;
use app\modules\course\models\Theme;
use Yii;
use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\GetAllAction;
use app\components\actions\GetOneAction;
use app\components\actions\RestoreAction;
use app\components\actions\UpdateAction;
use app\modules\course\models\Course;
use yii\filters\AccessControl;
use yii\web\Controller;

/**
 * Default controller for the `course` module
 */
class CourseController extends Controller
{

    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => [
                            'get-one', 'get-all',
                            'get-chapter',
                            'get-theme',
                            'get-lesson',
                        ],
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['create', 'create-chapter', 'create-theme', 'create-lesson'],
                        'permissions' => [Course::PERMISSION_CREATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['update', 'update-chapter', 'update-theme', 'update-lesson'],
                        'permissions' => [Course::PERMISSION_UPDATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => [
                            'delete', 'restore',
                            'delete-chapter', 'restore-chapter',
                            'delete-lesson', 'restore-lesson',
                            'delete-theme', 'restore-theme',
                        ],
                        'permissions' => [Course::PERMISSION_DELETE],
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
        if (!Yii::$app->user->can(Course::PERMISSION_UPDATE)) {
            $scopes[] = 'published';
        }
        if (!Yii::$app->user->can(Course::PERMISSION_DELETE)) {
            $scopes[] = 'notDeleted';
        }

        return [
            'get-one' => [
                'class' => GetOneAction::class,
                'modelName' => Course::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'get-all' => [
                'class' => GetAllAction::class,
                'modelName' => Course::class,
                'page' => Yii::$app->request->get('page', 1),
                'scopes' => $scopes,
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelName' => Course::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => Course::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelName' => Course::class,
                'modelPk' => Yii::$app->request->post('id'),
                'isSoft' => true,
            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => Course::class,
                'modelPk' => Yii::$app->request->post('id'),
            ],
            'get-chapter' => [
                'class' => GetOneAction::class,
                'modelName' => Chapter::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'create-chapter' => [
                'class' => CreateAction::class,
                'modelName' => Chapter::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'update-chapter' => [
                'class' => UpdateAction::class,
                'modelName' => Chapter::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'delete-chapter' => [
                'class' => DeleteAction::class,
                'modelName' => Chapter::class,
                'modelPk' => Yii::$app->request->post('id'),
                'isSoft' => true,
            ],
            'restore-chapter' => [
                'class' => RestoreAction::class,
                'modelName' => Chapter::class,
                'modelPk' => Yii::$app->request->post('id'),
            ],
            'get-theme' => [
                'class' => GetOneAction::class,
                'modelName' => Theme::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'create-theme' => [
                'class' => CreateAction::class,
                'modelName' => Theme::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'update-theme' => [
                'class' => UpdateAction::class,
                'modelName' => Theme::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'delete-theme' => [
                'class' => DeleteAction::class,
                'modelName' => Theme::class,
                'modelPk' => Yii::$app->request->post('id'),
                'isSoft' => true,
            ],
            'restore-theme' => [
                'class' => RestoreAction::class,
                'modelName' => Theme::class,
                'modelPk' => Yii::$app->request->post('id'),
            ],
            'get-lesson' => [
                'class' => GetOneAction::class,
                'modelName' => Lesson::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'create-lesson' => [
                'class' => CreateAction::class,
                'modelName' => Lesson::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'update-lesson' => [
                'class' => UpdateAction::class,
                'modelName' => Lesson::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'delete-lesson' => [
                'class' => DeleteAction::class,
                'modelName' => Lesson::class,
                'modelPk' => Yii::$app->request->post('id'),
                'isSoft' => true,
            ],
            'restore-lesson' => [
                'class' => RestoreAction::class,
                'modelName' => Lesson::class,
                'modelPk' => Yii::$app->request->post('id'),
            ],
        ];
    }

}
