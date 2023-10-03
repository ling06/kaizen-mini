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
                            'get-chapter', 'get-chapters',
                            'get-theme', 'get-themes',
                            'get-lesson', 'get-lessons',
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
                            'delete-chapter', 'restore-theme',
                            'delete-lesson', 'restore-chapter',
                            'delete-theme', 'restore-lesson',
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
        $courseModel = new Course();
        $chapterModel = new Chapter();
        $themeModel = new Theme();
        $lessonModel = new Lesson();
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
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => Course::class,
                'attributes' => Yii::$app->request->post(),
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelName' => Course::class,
                'modelPk' => Yii::$app->request->post($courseModel->formName())['id'] ?? null,
                'isSoft' => true,
            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => Course::class,
                'modelPk' => Yii::$app->request->post($courseModel->formName())['id'] ?? null,
            ],
        ];
    }

}
