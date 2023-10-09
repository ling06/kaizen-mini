<?php

namespace app\modules\course\models;

use yii\base\Model;

class Answer extends Model
{

    public $text = '';
    public $rightText = '';
    public $wrongText = '';

    public function rules(): array
    {
        return [
            [['text', 'rightText', 'wrongText'], 'string'],
            [['isOpen'], 'boolean'],
        ];
    }

}
