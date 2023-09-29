<?php

namespace app\components;

use http\Client;
use Yii;
use yii\web\User;

class WebUser extends User
{

    public function loginRequired($checkAjax = true, $checkAcceptHeader = true)
    {
        $returnUrl = Yii::$app->getRequest()->getHostInfo() . Yii::$app->getRequest()->getUrl();
        $url = 'https://passport.borboza.com/passport/login?returl=' . base64_encode($returnUrl);

        return Yii::$app->getResponse()->redirect($url);
    }

    public function getIsGuest(): bool
    {
        if (isset($_COOKIE['orders_borboza_sid']) && $this->model === null) {
            $url = 'https://passport.borboza.com/passport/check-user-login';
            $client =
            $passportResponse = Yii::$app->cURL->post($url, [
                'domain' => 'orders.borboza.com',
                'key' => '45asdsa4545sew277rtt',
                'sessionId' => $_COOKIE['orders_borboza_sid'],
                'userip' => $_SERVER['REMOTE_ADDR']
            ]);

            if ($passportResponse === 'BlockedServer') {
                header('Location: https://www.yandex.ru/');
                exit;
            }

            if ($passportResponse != 'ERR') {
                $uInfo = unserialize($passportResponse);
                //if (isset($uInfo['user_id']) && $uInfo['user_id']==345) $uInfo['user_id'] = 2108;
                if (isset($uInfo['user_id']))
                    $this->model = User::model()->findByPk($uInfo['user_id']);
            }
        }

        return $this->model == null;
    }

}