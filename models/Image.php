<?php

namespace app\models;

use Yii;
use app\components\behaviors\DeleteSoftBehavior;
use app\components\KaizenHelper;
use app\models\queries\ImageQuery;
use yii\behaviors\BlameableBehavior;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;
use yii\web\UploadedFile;

/**
 * This is the model class for table "image".
 *
 * @property int $id
 * @property string|null $server Сервер где хранится изображение
 * @property string|null $directory Директория изображения
 * @property string|null $name Имя файла изображения
 * @property string|null $original_name Оригинальное название изображения
 * @property int|null $user_id Id пользователя, загрузившего изображение
 * @property string|null $date Дата загрузки
 * @property string|null $model_name Модель, для которой предназначается изображение
 * @property string|null $model_pk Id модели, для которой предназначается изображение
 * @property string|null $type Тип изображения
 * @property int|null $is_deleted Удалено ли изображение
 *
 * @property User $user
 */
class Image extends \app\components\ActiveRecord
{

    public const UPLOAD_DIR = '@webroot/images/upload';
    public const IMAGE_DIR = '/images/upload';

    /** @var UploadedFile загруженный файл */
    public $file;

    /** @var string файл в base64 */
    public $fileData;

    /** @var string расширение файла, если он в base64 */
    public $extension;

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'image';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['directory'], 'string'],
            [['user_id'], 'integer'],
            [['date'], 'safe'],
            [['server', 'name', 'original_name', 'model_name'], 'string', 'max' => 200],
            [['model_pk', 'type'], 'string', 'max' => 50],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['is_deleted'], 'boolean'],
            [['is_deleted'], 'default', 'value' => false],
            [['file'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png,jpg,webp'],
            [['fileData'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'server' => 'Сервер где хранится изображение',
            'directory' => 'Директория изображения',
            'name' => 'Имя файла изображения',
            'original_name' => 'Оригинальное название изображения',
            'user_id' => 'Id пользователя, загрузившего изображение',
            'date' => 'Дата загрузки',
            'model_name' => 'Модель, для которой предназначается изображение',
            'model_pk' => 'Id модели, для которой предназначается изображение',
            'type' => 'Тип изображения',
            'is_deleted' => 'Удалено ли изображение',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return ActiveQuery|\app\models\queries\UserQuery
     */
    public function getUser(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return ImageQuery the active query used by this AR class.
     */
    public static function find(): ActiveQuery
    {
        return new ImageQuery(static::class);
    }

    public static function uploadTmpImageEditorJs()
    {
        $file = UploadedFile::getInstanceByName('upload');
        $uploadDir = Yii::getAlias(static::UPLOAD_DIR) . '/' . 'editorJsTmp/';
        $fileName = KaizenHelper::guidv4() . '.' . static::getExtension($file);
        if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);
        $file->saveAs($uploadDir . $fileName);

        return '/images/upload/editorJsTmp/' . $fileName;

    }

    public static function saveEditorJsImage($editorJsArray, $modelName, $lessonId)
    {
        foreach ($editorJsArray as $editor) {
            if ($editor->type === 'image') {
                $uploadDir = Yii::getAlias('@webroot');
                $newDir = Yii::getAlias(static::UPLOAD_DIR) . '/' . $modelName . '/' . $lessonId . '/';
                if (!file_exists($newDir)) {
                    mkdir($newDir, 0777, true);
                }
                $file = pathinfo($uploadDir . $editor->data->file->url);
                rename($file['dirname'] . '/' . $file['basename'], $newDir . $file['basename']);
                $editor->data->file->url = str_replace('editorJsTmp', $modelName . '/' . $lessonId, $editor->data->file->url);
            }
        }
        return $editorJsArray;

    }

    public function upload(): array
    {
        $existFile = static::find()->where(['model_name' => $this->model_name, 'model_pk' => $this->model_pk])->all();
        if ($existFile) {
            foreach ($existFile as $file) {
                if (file_exists($file->getPath())) unlink($file->getPath());
                $file->delete();
            }
        }
        $this->server = KaizenHelper::getServerName();
        $this->directory = static::IMAGE_DIR;
        $this->name = KaizenHelper::guidv4() . '.' . ($this->file->extension ?? $this->extension);
        if ($this->file) {
            $this->original_name = $this->file->baseName . '.' . $this->file->extension;
            $this->file->saveAs($this->getPath());
        } elseif ($this->fileData) {
            $replaceExtantion = ($this->extension == 'jpg') ? 'jpeg' : $this->extension;
            $this->original_name = $this->name;
            file_put_contents($this->getPath(), base64_decode(str_replace('data:image/' . $replaceExtantion . ';base64,', '', $this->fileData)));
        }
        if ($this->save()) {
            return [
                'result' => true,
                'data' => [
                    'url' => static::IMAGE_DIR . '/' . $this->name,
                ],
            ];
        }

        $filePath = $this->getPath();
        if (is_file($filePath)) unlink($filePath);
        return [
            'result' => false,
            'data' => $this->errors,
        ];
    }

    public static function getExtension($file): string
    {
        return strtolower(pathinfo($file->name, PATHINFO_EXTENSION));
    }

    public function getPath(): string
    {
        return Yii::getAlias(static::UPLOAD_DIR) . '/' . $this->name;
    }

    public function getUrl(): string
    {
        return static::IMAGE_DIR . '/' . $this->name;
    }

    public function scenarios(): array
    {
        $scenarios = parent::scenarios();
        $scenarios[DeleteSoftBehavior::SCENARIO_DELETE_SOFT] = ['is_deleted'];
        $scenarios[DeleteSoftBehavior::SCENARIO_RESTORE] = ['is_deleted'];
        return $scenarios;
    }

    public function behaviors(): array
    {
        return [
            'deleteSoft' => [
                'class' => DeleteSoftBehavior::class,
            ],
            'author' => [
                'class' => BlameableBehavior::class,
                'createdByAttribute' => 'user_id',
                'updatedByAttribute' => null,
            ],
            'date' => [
                'class' => TimestampBehavior::class,
                'createdAtAttribute' => 'date',
                'updatedAtAttribute' => null,
                'value' => date('Y-m-d H:i:s'),
            ],
        ];
    }

    public function formName(): string
    {
        return '';
    }

}
