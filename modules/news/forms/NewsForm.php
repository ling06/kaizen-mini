<?php

namespace app\modules\news\forms;

use app\components\behaviors\ImageBehavior;
use app\modules\news\models\News;
use app\modules\news\models\NewsCategories;
use app\modules\news\models\NewsCategory;

class NewsForm extends News
{

    private $categories = [];

    public function rules(): array
    {
        $rules = parent::rules();
        $rules[] = [['id', 'image'], 'safe'];
        return $rules;
    }

    public function attributeLabels(): array
    {
        return array_merge(parent::attributeLabels(), [
            'image' => 'Изображение',
        ]);
    }

    public function formName(): string
    {
        return '';
    }

    public function load($data, $formName = null): bool
    {
        $this->categories = $data['NewsCategory'] ?? [];
        return parent::load($data, $formName);
    }

    public function afterSave($insert, $changedAttributes): void
    {
        NewsCategories::deleteAll(['news_id' => $this->id]);
        foreach ($this->categories as $categoryData) {
            if (isset($categoryData['id'])) {
                $newsCategories = new NewsCategories([
                    'news_id' => $this->id,
                    'news_category_id' => $categoryData['id'],
                ]);
                $newsCategories->save();
            } else {
                $newsCategory = new NewsCategory([
                    'title' => $categoryData['title'] ?? '',
                ]);
                if ($newsCategory->save()) {
                    $newsCategories = new NewsCategories([
                        'news_id' => $this->id,
                        'news_category_id' => $newsCategory->id,
                    ]);
                    $newsCategories->save();
                }
            }
        }
        parent::afterSave($insert, $changedAttributes);
    }

    public function behaviors(): array
    {
        return array_merge(parent::behaviors(), [
            'image' => [
                'class' => ImageBehavior::class,
            ],
        ]);
    }

}
