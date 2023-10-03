<?php

namespace app\components\actions;

use yii\base\Action;
use yii\db\ActiveQuery;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\web\Response;

class GetAllAction extends Action
{

    public $modelName;
    public $fields;
    public $pageSize = 20;
    public $page = 1;
    public $scopes = [];

    public function run()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;

        /** @var ActiveQuery $query */
        $query = ($this->modelName)::find($this->id);
        if ($this->fields) {
            $query->select($this->fields);
        }
        foreach ($this->scopes as $scope) {
            if (is_callable($scope)) {
                $scope($query);
            } elseif (is_string($scope)) {
                $query->$scope();
            }
        }
        $count = $query->count();
        $pagesCount = ceil($count / $this->pageSize);
        $models = $query
            ->limit($this->pageSize)
            ->offset($this->pageSize * ($this->page - 1))
            ->asArray()
            ->all();

        $result = [
            'data' => $models,
            'count' => $count,
            'pagesCount' => ceil($count / $this->pageSize),
            'page' => $this->page,
        ];
        if ($this->page > 1) {
            $result['prevPage'] = Url::current(['page' => ($this->page - 1)]);
        }
        if ($this->page < $pagesCount) {
            $result['nextPage'] = Url::current(['page' => ($this->page + 1)]);
        }

        return $result;
    }

}
