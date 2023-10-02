<?php

namespace app\components;

use app\models\User;
use yii\httpclient\Client;
use Yii;

class WebUser extends \yii\web\User
{

    /**
     * @inheritDoc
     */
    public function loginRequired($checkAjax = true, $checkAcceptHeader = true)
    {
        $returnUrl = Yii::$app->getRequest()->getHostInfo() . Yii::$app->getRequest()->getUrl();
        $url = 'https://passport.borboza.com/passport/login?returl=' . base64_encode($returnUrl);
        return Yii::$app->getResponse()->redirect($url);
    }

    /**
     * @inheritDoc
     */
    protected function renewAuthStatus()
    {
        if (isset($_COOKIE['orders_borboza_sid']) && $this->getIdentity() === null) {
            $passportResponse = (new Client())->createRequest()
                ->setUrl('https://passport.borboza.com/passport/check-user-login')
                ->setMethod('POST')
                ->setData([
                    'domain' => 'orders.borboza.com',
                    'key' => '45asdsa4545sew277rtt',
                    'sessionId' => $_COOKIE['orders_borboza_sid'],
                    'userip' => $_SERVER['REMOTE_ADDR']
                ])
                ->send();

            if ($passportResponse->content === 'BlockedServer') {
                header('Location: https://www.yandex.ru/');
                exit;
            }

            if ($passportResponse->content !== 'ERR') {
                $uData = unserialize($passportResponse->content);
                if (isset($uData['user_id'])) {
                    $user = User::findOne($uData['user_id']);
                    if (!$user) {
                        $uInfo = unserialize($uData['user_info']);
                        $user = new User([
                            'name' => mb_convert_encoding($uInfo['name'], 'utf8', 'cp1251'),
                            'username' => $uInfo['login'],
                        ]);
                        $user->id = $uInfo['user_id'];
                        $user->save();
                    }
                    $this->setIdentity($user);
                    return;
                }
            }
        }

        $this->setIdentity(null);
    }

}