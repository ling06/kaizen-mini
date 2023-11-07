<?php

namespace app\components\behaviors;

use app\models\Image;
use yii\base\Behavior;
use yii\base\Model;
use yii\db\ActiveQuery;
use yii\db\BaseActiveRecord;
use yii\web\UploadedFile;

/**
 * @var Model $owner
 */
class ImageBehavior extends Behavior
{

    /** @var UploadedFile|array изображение вида UploadedFile или ['data' => 'base64', 'extension' => 'string'] */
    public $image;

    public function events(): array
    {
        return [
            BaseActiveRecord::EVENT_AFTER_INSERT => 'uploadImage',
            BaseActiveRecord::EVENT_AFTER_UPDATE => 'uploadImage',
        ];
    }

    public function setImage($image)
    {
        $this->image = $image;
    }

    public function getImage(?string $type = null): ActiveQuery
    {
        $ownerClass = get_class($this->owner);
        return $this->owner->hasOne(Image::class, ['model_pk' => $ownerClass::primaryKey()[0]])
            ->andWhere([
                'model_name' => $ownerClass,
                'is_deleted' => false,
            ])
            ->andFilterWhere(['type' => $type]);
    }

    public function uploadImage(): ?Image
    {
        /** @var UploadedFile|string $imageData */
        $imageData = $this->image;
//        var_dump($imageData); die;
        if(isset($imageData['id'])){
            $currentImage = Image::find()->where(['id' => $imageData['id']])->one();
            if($currentImage){
                return null;
            }
        }
        if ($imageData) {
            $image = new Image();
            if (is_array($imageData)) {
                $image->fileData = $imageData['data'];
                $image->extension = $imageData['extension'];
            } else {
                $image->file = $imageData;
            }
            $image->model_name = get_class($this->owner);
            $image->model_pk = (string)$this->owner->primaryKey;
            $image->upload();
            return $image;
        }
        $currentImage  = Image::find()->where(['model_name' => get_class($this->owner), 'model_pk' => $this->owner->primaryKey])->all();
        if(!empty($currentImage)) {
            foreach ($currentImage as $image) {
                $image->delete();
            }
        }
        return null;
    }

}