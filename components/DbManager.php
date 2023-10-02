<?php

namespace app\components;

use app\models\User;
use yii\db\Query;
use yii\rbac\Assignment;

class DbManager extends \yii\rbac\DbManager
{

    public function getPermissionsByUser($userId): array
    {
        if ($this->isEmptyUserId($userId) || !($user = User::findOne($userId))) {
            return [];
        }

        return $this->getPermissionsByRole($user->role);
    }

    public function getAssignments($userId): array
    {
        if ($this->isEmptyUserId($userId) || !($user = User::findOne($userId))) {
            return [];
        }

        $items = (new Query())
            ->from($this->itemChildTable)
            ->where([
                'parent' => $user->role,
            ])
            ->all();

        $assignments = [];
        foreach ($items as $item) {
            $assignments[$item['child']] = new Assignment([
                'userId' => $user->id,
                'roleName' => $item['child'],
                'createdAt' => time(),
            ]);
        }
        return $assignments;
    }

}
