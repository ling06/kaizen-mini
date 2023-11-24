<?php

namespace app\modules\course\controllers;

use app\components\ApiController;
use app\modules\course\models\Lesson;
use app\modules\course\models\Question;
use app\modules\course\models\Test;
use app\modules\course\models\UserTestAnswer;
use Yii;
use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\UpdateAction;
use app\modules\course\models\Course;
use yii\filters\AccessControl;

/**
 * Default controller for the `test` module
 */
class TestController extends ApiController
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
                            'send-answer',
                        ],
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['add-test', 'update-test', 'create-question', 'update-question', 'delete-question'],
                        'permissions' => [Course::PERMISSION_CREATE, Course::PERMISSION_UPDATE],
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

    public function actionSendAnswer()
    {
        /** @var Question $question */
        $answers = Yii::$app->request->getBodyParams();
        if (!$answers) {
            return [
                'result' => false,
                'message' => 'А где ответ?',
            ];
        }

        foreach ($answers as $answer) {
//            var_dump($answer); die;
            $question = $this->findModel(Question::class, (int)$answer['answer']);
            $params = [
                'test_question_id' => $answer['test_id'],
                'user_id' => Yii::$app->user->id,
            ];

            $params['answer'] = $answer['answer'];
            $params['is_right'] = UserTestAnswer::ANSWER_IS_WRONG;
            if ($question->right_answer) {
                $params['is_right'] = UserTestAnswer::ANSWER_IS_RIGHT;
            }

            $userTestAnswer = UserTestAnswer::findOne($params) ?? new UserTestAnswer($params);
            $result[] =  [
                'result' => $userTestAnswer->save(),
                'data' => [
                    'isRight' => $params['is_right'],
                    'message' => $params['is_right'] === UserTestAnswer::ANSWER_IS_RIGHT
                        ? $variants[$answer]->rightText ?? ''
                        : $variants[$answer]->wrongText ?? '',
                ],
            ];
        }
        return $result ?? [];
    }

    /* @todo пока что нет в ТЗ (да и ТЗ тоже нет, чего уж там) */
    public function actionCheckAnswer()
    {
    }

    public function actionGetUserAnswers()
    {
    }

    public function actions(): array
    {

        return [
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
