<?php

namespace app\modules\course\forms;

use app\components\KaizenHelper;
use app\modules\course\models\Theme;

class ThemeForm extends Theme
{

    public $newPosition;
    public function formName(): string
    {
        return '';
    }

    public function load($data, $formName = null): bool
    {
        $this->newPosition = $data['newPosition'] ?? null;
        return parent::load($data, $formName);
    }

    public function afterSave($insert, $changedAttributes): void
    {
        KaizenHelper::setPosition(Theme::class, $this->id, $this->position, $this->newPosition);
        parent::afterSave($insert, $changedAttributes);
    }

}