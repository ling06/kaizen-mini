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
        return parent::beforeSave($insert);
    }

    public function afterSave($insert, $changedAttributes): void
    {
        $editedTests = [];
        $testsFromDb = Test::find()->where(['lesson_id' => $this->id])->select('id')->all();
        foreach ($this->tests as $tests) {
            if (isset($tests['id']) && !empty($tests['id'])) {
                $editedTests[] = $tests['id'];
                $test = Test::find()->where(['id' => $tests['id']])->one();
            } else {
                $test = new Test;
            }
            $test->lesson_id = $this->id;
            $test->question = $tests['question'];
            if ($test->save() && !empty($test->id)) {
                foreach ($tests['answers'] as $answer) {
                    if (isset($answer['id']) && !empty($answer['id'])) {
                        $testAnswer = Question::find()->where(['id' => $answer['id']])->one();
                    } else {
                        $testAnswer = new Question;
                    }
                    $testAnswer->test_id = $test->id;
                    $testAnswer->answer = $answer['answer'];
                    $testAnswer->right_answer = $answer['right_answer'];
                    $testAnswer->text = $answer['text'];
                    $testAnswer->save(false);
                }
            }
        }
        if ($testsFromDb) {
            foreach ($testsFromDb as $dbTest) {
                if (!in_array($dbTest->id, $editedTests)) {
                    $dbTest->deleteSoft();
                }
            }
        }
        $lesson = Lesson::findOne($this->id);
        if ($lesson->description) {
            $lesson->description = json_encode(Image::saveEditorJsImage(json_decode($lesson->description), 'LessonsEditorJS', $this->id), JSON_UNESCAPED_UNICODE);
        }
        $lesson->save();

        parent::afterSave($insert, $changedAttributes);
    }
}