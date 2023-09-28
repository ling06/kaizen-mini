<?php

namespace app\commands;

use app\models\User;
use app\modules\news\models\News;
use yii\console\Controller;

class AuthController extends Controller
{

    public function actionInit()
    {
        $authManager = \Yii::$app->authManager;
        $authManager->removeAll();

        $permissions = [
            User::ROLE_USER => [
                News::PERMISSION_READ,
            ],
            User::ROLE_TRAINER => [
                News::PERMISSION_CREATE,
                News::PERMISSION_READ,
                News::PERMISSION_UPDATE,
                News::PERMISSION_DELETE,
            ],
            User::ROLE_ADMIN => [
                News::PERMISSION_CREATE,
                News::PERMISSION_READ,
                News::PERMISSION_UPDATE,
                News::PERMISSION_DELETE,
            ],
        ];

        $createdPermissions = [];

        foreach ($permissions as $roleName => $rolePermissions) {
            $role = $authManager->createRole($roleName);
            $authManager->add($role);
            foreach ($rolePermissions as $rolePermission) {
                $permission = $createdPermissions[$rolePermission] ?? $authManager->createPermission($rolePermission);
                if (empty($createdPermissions[$rolePermission])) {
                    $createdPermissions[$rolePermission] = $permission;
                    $authManager->add($permission);
                }
                $authManager->addChild($role, $permission);
            }
        }

        echo 'OK';
    }

}
