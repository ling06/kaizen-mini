<?php

namespace app\modules\course\controllers;

use app\components\ApiController;
use app\components\KaizenHelper;
use app\models\Image;
use app\modules\course\models\Chapter;
use app\modules\course\models\Lesson;
use app\modules\course\models\Theme;
use app\modules\course\models\UserCheck;
use Yii;
use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\GetAllAction;
use app\components\actions\GetOneAction;
use app\components\actions\RestoreAction;
use app\components\actions\UpdateAction;
use app\modules\course\models\Course;
use yii\db\ActiveQuery;
use yii\filters\AccessControl;
use yii\web\Response;
use yii\web\UploadedFile;

/**
 * Default controller for the `course` module
 */
class CourseController extends ApiController
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
                            'chapter',
                            'theme',
                            'lesson',
                            'send-answer',
                            'check-lesson',
                        ],
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['create', 'create-chapter', 'create-theme', 'create-lesson', 'upload-temp-image'],
                        'permissions' => [Course::PERMISSION_CREATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['update', 'update-chapter', 'update-theme', 'update-lesson', 'autosave-lesson', 'upload-temp-image'],
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
                    [
                        'allow' => true,
                        'actions' => ['get-user-answers', 'check-answer'],
                        'permissions' => [Course::PERMISSION_CHECK_ANSWERS],
                    ],
                ],
            ]
        ];
    }

    public function actionAutosaveLesson(): array
    {
        $lesson = $this->findModel(Lesson::class, (int)Yii::$app->request->getBodyParam('id'));
        $lesson->scenario = Lesson::SCENARIO_AUTOSAVE;
        $lesson->description_autosave = Yii::$app->request->getBodyParam('description');
        return [
            'result' => $lesson->save(),
        ];
    }

    public function actionCheckLesson()
    {
        /** @var Lesson $lesson */
        $lesson = $this->findModel(Lesson::class, (int)Yii::$app->request->getBodyParam('id'));
        $checkParams = [
            'user_id' => Yii::$app->user->id,
            'model_name' => Lesson::class,
            'model_pk' => $lesson->id,
        ];
        $check = UserCheck::findOne($checkParams) ?? new UserCheck($checkParams);
        return [
            'data' => [
                'theme_id' => $lesson->theme_id,
            ],
            'result' => $check->isNewRecord ? $check->save() : true,
        ];
    }

    public function actionUploadTempImage()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $file = UploadedFile::getInstanceByName('image');
        $uploadDir = Yii::getAlias(Image::UPLOAD_DIR) . '/' . 'editorJsTmp/';
        $fileName = KaizenHelper::guidv4() . '.' . $this->getExtension($file);
        if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);
        $file->saveAs($uploadDir . $fileName);

        return ['success' => 1, 'file' => ['url' => '/images/upload/editorJsTmp/' . $fileName]];

    }

    public function getExtension($file)
    {
        return strtolower(pathinfo($file->name, PATHINFO_EXTENSION));
    }

    public function beforeAction($action): bool
    {
        if ($action->id === 'get-all') {
            Chapter::useExtraFields([]);
        }
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
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => Course::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'delete' => [
                'class' => DeleteAction::class,
                'modelName' => Course::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
                'isSoft' => true,
            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => Course::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
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
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'update-chapter' => [
                'class' => UpdateAction::class,
                'modelName' => Chapter::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'delete-chapter' => [
                'class' => DeleteAction::class,
                'modelName' => Chapter::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
                'isSoft' => true,
            ],
            'restore-chapter' => [
                'class' => RestoreAction::class,
                'modelName' => Chapter::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
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
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'update-theme' => [
                'class' => UpdateAction::class,
                'modelName' => Theme::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'delete-theme' => [
                'class' => DeleteAction::class,
                'modelName' => Theme::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
                'isSoft' => true,
            ],
            'restore-theme' => [
                'class' => RestoreAction::class,
                'modelName' => Theme::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
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
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'update-lesson' => [
                'class' => UpdateAction::class,
                'modelName' => Lesson::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'delete-lesson' => [
                'class' => DeleteAction::class,
                'modelName' => Lesson::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
                'isSoft' => true,
            ],
            'restore-lesson' => [
                'class' => RestoreAction::class,
                'modelName' => Lesson::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
            ],
        ];
    }

}
