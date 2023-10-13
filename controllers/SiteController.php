<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;

class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();
        return $this->goHome();
    }

    public function actionGetYamaguchiStats()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        /**
         * @todo
         * Сделать здесь запросы в Борбозу для получения статов пользователя (на макете сверху от новостей).
         * В rules в web.php прописать 'api/stats' => 'site/get-yamaguchi-stats'.
         * Описать все в api.txt.
         * примерный ответ:
         */
        return [
            'planPercentage' => 100,
            'salary' => 999999,
            'app' => 233,
            'zebr' => [
                'count' => 2,
                'total' => 33,
            ],
            'stars' => [
                'count' => 4,
                'total' => 6,
            ],
        ];
    }

}
