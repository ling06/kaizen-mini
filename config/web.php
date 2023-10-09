<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'modules' => [
        'news' => ['class' => \app\modules\news\Module::class],
        'log' => ['class' => \app\modules\log\Module::class],
        'course' => ['class' => \app\modules\course\Module::class],
    ],
    'components' => [
        'request' => [
            'cookieValidationKey' => 'okjRtT_YXm5xSXBrJ84XpP-JCaxp-4mm',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'class' => \app\components\WebUser::class,
            'identityClass' => \app\models\User::class,
            'enableAutoLogin' => true,
            'enableSession' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'api/news' => 'news/news/get-all',
                'api/news/<id:\d+>' => 'news/news/get-one',
                'api/news/<action:\w+>' => 'news/news/<action>',
                'api/news-category' => 'news/category/get-all',
                'api/news-category/<action:\w+>' => 'news/category/<action>',
                'api/course' => 'course/course/get-all',
                'api/course/<id:\d+>' => 'course/course/get-one',
                'api/chapter/<id:\d+>' => 'course/course/get-chapter',
                'api/theme/<id:\d+>' => 'course/course/get-theme',
                'api/lesson/<id:\d+>' => 'course/course/get-lesson',
                'api/course/<action:[-\w]+>' => 'course/course/<action>',
            ],
        ],
        'authManager' => [
            'class' => \app\components\DbManager::class,
        ],
        'assetManager' => [
            'basePath' => '@webroot/std',
            'baseUrl' => '@web/std',
        ],
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
