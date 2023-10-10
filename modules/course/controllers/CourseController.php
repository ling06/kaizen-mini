<?php

namespace app\modules\course\controllers;

use app\components\ApiController;
use app\modules\course\models\Chapter;
use app\modules\course\models\Lesson;
use app\modules\course\models\Question;
use app\modules\course\models\Test;
use app\modules\course\models\Theme;
use app\modules\course\models\UserCheck;
use app\modules\course\models\UserTestAnswer;
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
                            'get-chapter',
                            'get-theme',
                            'get-lesson',
                            'send-answer',
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
                        'actions' => ['add-test', 'update-test', 'create-question', 'update-question', 'delete-question'],
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

    public function actionAddTest()
    {
        $lesson = $this->findModel(Lesson::class, (int)Yii::$app->request->getBodyParam('lesson_id'));
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
            'result' => false,
            'data' => $test->getErrors(),
        ];
    }

    public function actionCheckLesson()
    {
        $lesson = $this->findModel(Lesson::class, (int)Yii::$app->request->getBodyParam('id'));
        $checkParams = [
            'user_id' => Yii::$app->user->id,
            'model_name' => Lesson::class,
            'model_pk' => $lesson->id,
        ];
        $check = UserCheck::findOne($checkParams) ?? new UserCheck($checkParams);
        return [
            'result' => $check->isNewRecord ? $check->save() : true,
        ];
    }

    public function actionSendAnswer()
    {
        /** @var Question $question */
        $question = $this->findModel(Question::class, (int)Yii::$app->request->getBodyParam('question_id'));
        $answer = Yii::$app->request->getBodyParam('answer');
        if (!$answer) {
            return [
                'result' => false,
                'message' => 'А где ответ?',
            ];
        }

        $params = [
            'test_question_id' => $question->id,
            'user_id' => Yii::$app->user->id,
        ];
        $userTestAnswer = UserTestAnswer::findOne($params);
        if ($userTestAnswer) {
            return [
                'result' => false,
                'message' => 'Вы уже ответили на этот вопрос',
            ];
        }

        $params['answer'] = $answer;
        $params['is_right'] = UserTestAnswer::ANSWER_IS_UNKNOWN;
        if ($question->right_answer) {
            $params['is_right'] = $question->right_answer === $answer
                ? UserTestAnswer::ANSWER_IS_RIGHT
                : UserTestAnswer::ANSWER_IS_WRONG;
        }

        $variants = $question->answersList;

        $userTestAnswer = new UserTestAnswer($params);
        return [
            'result' => $userTestAnswer->save(),
            'data' => [
                'isRight' => $params['is_right'],
                'message' => $params['is_right'] === UserTestAnswer::ANSWER_IS_RIGHT
                    ? $variants[$answer]->rightText ?? ''
                    : $variants[$answer]->wrongText ?? '',
            ],
        ];
    }

    /* @todo пока что нет в ТЗ (да и ТЗ тоже нет, чего уж там) */
    public function actionCheckAnswer() {}
    public function actionGetUserAnswers() {}

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
            'update-test' => [
                'class' => UpdateAction::class,
                'modelName' => Test::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'create-question' => [
                'class' => CreateAction::class,
                'modelName' => Question::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'update-question' => [
                'class' => CreateAction::class,
                'modelName' => Question::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'delete-question' => [
                'class' => DeleteAction::class,
                'modelName' => Question::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
            ],
        ];
    }

}
