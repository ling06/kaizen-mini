<?php

namespace app\components;

class Request extends \yii\web\Request
{

    public function loadCsrfToken(): string
    {
        $token = parent::loadCsrfToken();
        if (!$token) {
            return \Yii::$app->request->getHeaders()->get('x-csrftoken');
        }
        return $token;
    }

}