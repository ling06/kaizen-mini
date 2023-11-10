<?php

namespace app\controllers;

use app\components\ApiController;
use app\models\Search;
use app\models\SearchHistory;
use Yii;
use yii\filters\AccessControl;

class SearchController extends ApiController
{
    /**
     * {@inheritdoc}
     */
    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'actions' => ['search', 'get-search-history', 'clear-search-history'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actionSearch()
    {
        $text = Yii::$app->request->get('text');
        if (!$text) return [
            'result' => false,
        ];

        SearchHistory::add($text);
        return [
            'result' => true,
            'data' => Search::search($text),
        ];
    }

    public function actionGetSearchHistory()
    {
        return [
            'result' => true,
            'data' => SearchHistory::get(),
        ];
    }

    public function actionClearSearchHistory()
    {
        SearchHistory::clear();
        return [
            'result' => true,
        ];
    }

}
