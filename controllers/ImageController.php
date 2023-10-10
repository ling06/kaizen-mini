<?php

namespace app\controllers;

use app\components\ApiController;
use app\models\Image;
use app\modules\course\models\Course;
use app\modules\news\models\News;
use yii\filters\AccessControl;
use yii\web\UploadedFile;

class ImageController extends ApiController
{

    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['upload-image'],
                        'permissions' => [
                            Course::PERMISSION_CREATE, Course::PERMISSION_UPDATE,
                            News::PERMISSION_CREATE, News::PERMISSION_UPDATE,
                        ],
                    ],
                ],
            ]
        ];
    }

    public function actionUploadImage()
    {
        $model = new Image();
        $file = UploadedFile::getInstance($model, 'image');
        if ($file) {
            $model->file = $file;
            return $model->upload();
        }
        $file = \Yii::$app->request->getBodyParam('image');
        $model->fileData = $file;
        return $model->upload();
    }

}