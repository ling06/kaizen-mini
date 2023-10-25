<?php

namespace app\modules\course\forms;

use app\models\Image;
use app\modules\course\models\Lesson;
use app\modules\course\models\Question;
use app\modules\course\models\Test;
use Yii;

class LessonForm extends Lesson
{
    public $tests = [];


    public function rules(): array
    {
        $rules = parent::rules();
        $rules[] = [['tests', 'question'], 'safe'];
        return $rules;
    }

    public function attributeLabels(): array
    {
        return array_merge(parent::attributeLabels(), [
            'tests' => 'Тесты',
        ]);
    }

    public function formName(): string
    {
        return '';
    }

    public function load($data, $formName = null): bool
    {
        $this->tests = $data['tests'] ?? [];
        return parent::load($data, $formName);
    }

    public function beforeSave($insert): bool
    {
        $editorJs = json_decode($this->description);
        foreach ($editorJs as $editor){
            if($editor->type === 'image'){
                $uploadDir = Yii::getAlias('@webroot');
                $newDir = Yii::getAlias(Image::UPLOAD_DIR) . '/EditorJs/';
                if (!file_exists($newDir)){
                    mkdir($newDir, 0777);
                }
                $file = pathinfo($uploadDir . $editor->data->file->url);
                rename($file['dirname'] . '/' . $file['basename'], $newDir . '/' . $file['basename']);
            }
        }
        return parent::beforeSave($insert);
    }

    public function afterSave($insert, $changedAttributes): void
    {
        foreach ($this->tests as $tests){
            if(isset($tests['id']) && !empty($tests['id'])){
                $test = Test::find()->where(['id'=>$tests['id']])->one();
            } else {
                $test = new Test;
            }
                $test->lesson_id = $this->id;
                $test->question = $tests['question'];
            if($test->save() && !empty($test->id)){
                foreach ($tests['answers'] as $answer){
                    if(isset($answer['id']) && !empty($answer['id'])){
                        $testAnswer = Question::find()->where(['id' => $answer['id']])->one();
                    } else {
                        $testAnswer = new Question;
                    }
                        $testAnswer->test_id = $test->id;
                        $testAnswer->answers = $answer['answer'];
                        $testAnswer->right_answer = $answer['right_answer'];
                        $testAnswer->text = $answer['text'];
                    $testAnswer->save();
                }
            }
        }
        parent::afterSave($insert, $changedAttributes);
    }
}