<?php

namespace app\components;

use yii\helpers\ArrayHelper;

class ActiveRecord extends \yii\db\ActiveRecord
{

    public static $usedExtraFields = [];

    public static function getExtraFields(): array
    {
        return [];
    }

    public static function useExtraFields(?array $keys = null): void
    {
        if (($keys[0] ?? null) === '*') $keys = null;
        static::$usedExtraFields[static::class] = $keys;
    }

    public function fields(): array
    {
        $extraFields = static::getExtraFields();
        if ((static::$usedExtraFields[static::class] ?? null) !== null) {
            $extraFields = ArrayHelper::filter($extraFields, static::$usedExtraFields[static::class]);
        }
        return array_merge(parent::fields(), $extraFields);
    }

}
