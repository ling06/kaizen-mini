<?php

namespace app\modules\course\controllers;

use app\components\ApiController;
use app\components\KaizenHelper;
use app\models\Image;
use app\modules\course\forms\LessonForm;
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
                            'get-user-answers',
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
                        'actions' => ['get-user-answers', 'check-answer', 'get-users-progress'],
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
        return ['success' => 1, 'file' => ['url' => Image::uploadTmpImageEditorJs()]];

    }

    public function actionGetUsersProgress()
    {
        $result = [];
        $courseId = (int)Yii::$app->request->getBodyParam('course_id');
        if (UserCheck::find()->where(['model_name' => Course::class, 'model_pk' => $courseId, 'user_id' => Yii::$app->user->id])->exists()) {
            return ['courseComplete' => true];
        }
        $allChapters = Chapter::find()->where(['course_id' => $courseId, 'is_deleted' => false])->indexBy('id')->all();
        $chapterIndex = 0;
        foreach ($allChapters as $chapter) {
            $chapterIndex++;
            if (!$chapter->isChecked) {
                if (empty($result['chapter']['id'])) {
                    $result['chapter']['id'] = $chapter->id;
                    $result['chapter']['name'] = $chapter->title;
                    $result['chapter']['position'] = $chapterIndex;
                }
                $result['chapter']['allQuantity'] = $chapterIndex;
            }
        }
        if(empty($result['chapter']['id'])) {
            return ['error' => 'Chapter not found'];
        }
        $allThemes = Theme::find()->where(['chapter_id' => $result['chapter']['id'], 'is_deleted' => false])->indexBy('id')->all();
        $themeIndex = 0;
        foreach ($allThemes as $theme) {
            $themeIndex++;
            if (!$theme->isChecked) {
                if (empty($result['theme']['id'])) {
                    $result['theme']['id'] = $theme->id;
                    $result['theme']['name'] = $theme->title;
                    $result['theme']['position'] = $themeIndex;
                }
                $result['theme']['allQuantity'] = $themeIndex;
            }
        }
        if(empty($result['theme']['id'])) {
            return ['error' => 'Theme not found'];
        }
        $allLessons = Lesson::find()->where(['theme_id' => $result['theme']['id'], 'is_deleted' => false])->indexBy('id')->all();
        $lessonIndex = 0;
        foreach ($allLessons as $lesson) {
            $lessonIndex++;
            if (!$lesson->isChecked) {
                if (empty($result['lesson']['id'])) {
                    $result['lesson']['id'] = $lesson->id;
                    $result['lesson']['name'] = $lesson->title;
                    $result['lesson']['position'] = $lessonIndex;
                }
            }
            $result['lesson']['allQuantity'] = $lessonIndex;

        }
        if(empty($result['lesson']['id'])) {
            return ['error' => 'Lesson not found'];
        }
        return ($result);
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
                'modelName' => LessonForm::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'update-lesson' => [
                'class' => UpdateAction::class,
                'modelName' => LessonForm::class,
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
