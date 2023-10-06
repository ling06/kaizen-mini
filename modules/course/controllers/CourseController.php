<?php

namespace app\modules\course\controllers;

use app\components\Controller;
use app\modules\course\models\Chapter;
use app\modules\course\models\Lesson;
use app\modules\course\models\Question;
use app\modules\course\models\Test;
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
use yii\web\Response;

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
                        'actions' => ['update', 'update-chapter', 'update-theme', 'update-lesson', 'autosave-lesson'],
                        'permissions' => [Course::PERMISSION_UPDATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['add-test', 'update-test'],
                        'permissions' => [Course::PERMISSION_CREATE, Course::PERMISSION_UPDATE],
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

    public function actionAutosaveLesson(): array
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $lesson = $this->findModel(Lesson::class, (int)Yii::$app->request->post('id'));
        $lesson->scenario = Lesson::SCENARIO_AUTOSAVE;
        $lesson->description_autosave = Yii::$app->request->post('description');
        return [
            'result' => $lesson->save(),
        ];
    }

    public function actionAddTest()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $lesson = $this->findModel(Lesson::class, (int)Yii::$app->request->post('lesson_id'));
        $test = $lesson->test ?? new Test([
            'lesson_id' => $lesson->id,
            'is_active' => false,
        ]);

        if ($test->save()) {
            return [
                'result' => true,
                'data' => $test->toArray(),
            ];
        }
        return [
            'result' => true,
            'data' => $test->getErrors(),
        ];
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
                'with' => [
                    'chapters',
                    'chapters.themes',
                    'chapters.themes.lessons',
                ],
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
            'chapter' => [
                'class' => GetOneAction::class,
                'modelName' => Chapter::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'create-chapter' => [
                'class' => CreateAction::class,
                'modelName' => Chapter::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'update-chapter' => [
                'class' => UpdateAction::class,
                'modelName' => Chapter::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
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
            'theme' => [
                'class' => GetOneAction::class,
                'modelName' => Theme::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'create-theme' => [
                'class' => CreateAction::class,
                'modelName' => Theme::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'update-theme' => [
                'class' => UpdateAction::class,
                'modelName' => Theme::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
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
            'lesson' => [
                'class' => GetOneAction::class,
                'modelName' => Lesson::class,
                'modelPk' => Yii::$app->request->get('id'),
                'scopes' => $scopes,
            ],
            'create-lesson' => [
                'class' => CreateAction::class,
                'modelName' => Lesson::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'update-lesson' => [
                'class' => UpdateAction::class,
                'modelName' => Lesson::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
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
            'update-test' => [
                'class' => UpdateAction::class,
                'modelName' => Test::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'create-question' => [
                'class' => UpdateAction::class,
                'modelName' => Question::class,
                'attributes' => Yii::$app->request->post(),
                'formName' => '',
            ],
            'delete-question' => [
                'class' => DeleteAction::class,
                'modelName' => Question::class,
                'modelPk' => Yii::$app->request->post('id'),
            ],
        ];
    }

}
