<?php

namespace app\components\behaviors;

use yii\base\Behavior;

class DeleteSoftBehavior extends Behavior
{

    public const SCENARIO_DELETE_SOFT = 'deleteSoft';
    public const SCENARIO_RESTORE = 'restore';

    public $attribute = 'is_deleted';

    public function deleteSoft(): bool
    {
        $oldScenario = $this->owner->scenario;
        $this->owner->scenario = static::SCENARIO_DELETE_SOFT;
        $this->owner->{$this->attribute} = true;
        $result = $this->owner->save();
        $this->owner->scenario = $oldScenario;
        return $result;
    }

    public function restore(): bool
    {
        $oldScenario = $this->owner->scenario;
        $this->owner->scenario = static::SCENARIO_RESTORE;
        $this->owner->{$this->attribute} = false;
        $result = $this->owner->save();
        $this->owner->scenario = $oldScenario;
        return $result;
    }

}
