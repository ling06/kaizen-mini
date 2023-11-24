<?php

namespace app\modules\news\controllers;

use app\components\actions\CreateAction;
use app\components\actions\DeleteAction;
use app\components\actions\RestoreAction;
use app\components\actions\UpdateAction;
use app\modules\news\models\NewsCategories;
use app\modules\news\models\NewsCategory;
use Yii;
use app\components\actions\GetAllAction;
use yii\filters\AccessControl;
use app\components\ApiController;

class CategoryController extends ApiController
{

    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'actions' => ['get-all'],
                        'roles' => ['@'],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['create'],
                        'permissions' => [NewsCategory::PERMISSION_CREATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['update'],
                        'permissions' => [NewsCategory::PERMISSION_UPDATE],
                    ],
                    [
                        'allow' => true,
                        'actions' => ['delete', 'restore'],
                        'permissions' => [NewsCategory::PERMISSION_DELETE],
                    ],
                ],
            ]
        ];
    }

    public function actionDelete(){
        $id = Yii::$app->request->getBodyParams('id');
        $category = NewsCategory::findOne($id);
//        var_dump($category); die;
        if (!$category) {
            return ['status' => 'error', 'message' => 'Category not found'];
        }
        if(NewsCategories::find()->where(['news_category_id' => $id])->count() > 0){
            return ['status' => 'error', 'message' => 'Category has news'];
        }
        if($category->delete()){
            return ['status' => 'success', 'message' => 'Category deleted'];
        }
        return ['status' => 'error', 'message' => 'something went wrong'];
    }

    public function actions(): array
    {
        $scopes = [];
        if (!Yii::$app->user->can(NewsCategory::PERMISSION_DELETE)) {
            $scopes[] = 'notDeleted';
        }

        return [
            'get-all' => [
                'class' => GetAllAction::class,
                'modelName' => NewsCategory::class,
                'scopes' => $scopes,
                'pageSize' => 10000,
            ],
            'create' => [
                'class' => CreateAction::class,
                'modelName' => NewsCategory::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
            'update' => [
                'class' => UpdateAction::class,
                'modelName' => NewsCategory::class,
                'attributes' => Yii::$app->request->getBodyParams(),
                'formName' => '',
            ],
//            'delete' => [
//                'class' => DeleteAction::class,
//                'modelName' => NewsCategory::class,
//                'modelPk' => Yii::$app->request->getBodyParam('id'),
//                'isSoft' => true,
//            ],
            'restore' => [
                'class' => RestoreAction::class,
                'modelName' => NewsCategory::class,
                'modelPk' => Yii::$app->request->getBodyParam('id'),
            ],
        ];
    }

}