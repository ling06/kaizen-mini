<?php

namespace app\commands;

use app\models\User;
use app\modules\competition\models\Competition;
use app\modules\course\models\Course;
use app\modules\news\models\News;
use app\modules\news\models\NewsCategory;
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
                Course::PERMISSION_READ,
                Competition::PERMISSION_READ,
            ],
            User::ROLE_TRAINER => [
                News::PERMISSION_CREATE,
                News::PERMISSION_READ,
                News::PERMISSION_UPDATE,
                News::PERMISSION_DELETE,
                NewsCategory::PERMISSION_CREATE,
                NewsCategory::PERMISSION_UPDATE,
                NewsCategory::PERMISSION_DELETE,
                Course::PERMISSION_CREATE,
                Course::PERMISSION_READ,
                Course::PERMISSION_UPDATE,
                Course::PERMISSION_DELETE,
                Course::PERMISSION_CHECK_ANSWERS,
                Competition::PERMISSION_CREATE,
                Competition::PERMISSION_READ,
                Competition::PERMISSION_UPDATE,
                Competition::PERMISSION_DELETE,
            ],
            User::ROLE_ADMIN => [
                News::PERMISSION_CREATE,
                News::PERMISSION_READ,
                News::PERMISSION_UPDATE,
                News::PERMISSION_DELETE,
                NewsCategory::PERMISSION_CREATE,
                NewsCategory::PERMISSION_UPDATE,
                NewsCategory::PERMISSION_DELETE,
                Course::PERMISSION_CREATE,
                Course::PERMISSION_READ,
                Course::PERMISSION_UPDATE,
                Course::PERMISSION_DELETE,
                Course::PERMISSION_CHECK_ANSWERS,
                Competition::PERMISSION_CREATE,
                Competition::PERMISSION_READ,
                Competition::PERMISSION_UPDATE,
                Competition::PERMISSION_DELETE,
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
