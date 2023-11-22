<?php

namespace app\modules\course\forms;

use app\components\KaizenHelper;
use app\modules\course\models\Chapter;

class ChapterForm extends Chapter
{
    public function formName(): string
    {
        return '';
    }

    public function load($data, $formName = null): bool
    {
        return parent::load($data, $formName);
    }

    public function afterSave($insert, $changedAttributes): void
    {
        KaizenHelper::setPosition(Chapter::class, $this->id);
        parent::afterSave($insert, $changedAttributes);
    }

}