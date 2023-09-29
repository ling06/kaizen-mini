<?php

namespace app\modules\news\models;

use app\models\queries\UserQuery;
use app\models\User;
use app\modules\news\models\queries\NewsQuery;

/**
 * This is the model class for table "news".
 *
 * @property int $id
 * @property int|null $user_id Id автора
 * @property string|null $title Заголовок
 * @property string|null $text Полный текст
 * @property string|null $date Дата публикации
 *
 * @property User $user
 */
class News extends \yii\db\ActiveRecord
{

    public const PERMISSION_READ = 'news-read';
    public const PERMISSION_CREATE = 'news-create';
    public const PERMISSION_UPDATE = 'news-update';
    public const PERMISSION_DELETE = 'news-delete';

    public const STATUS_DRAFT = 0;
    public const STATUS_PUBLISHED = 1;
    public const STATUS_DELETED = 2;

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'news';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['user_id'], 'integer'],
            [['status'], 'in', 'range' => [static::STATUS_DRAFT, static::STATUS_PUBLISHED, static::STATUS_DELETED]],
            [['text'], 'string'],
            [['date'], 'safe'],
            [['title'], 'string', 'max' => 250],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['status'], 'default', 'value' => static::STATUS_DRAFT],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'user_id' => 'Id автора',
            'title' => 'Заголовок',
            'text' => 'Полный текст',
            'date' => 'Дата публикации',
            'status' => 'Статус',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery|UserQuery
     */
    public function getUser(): UserQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * {@inheritdoc}
     * @return NewsQuery the active query used by this AR class.
     */
    public static function find(): NewsQuery
    {
        return new NewsQuery(static::class);
    }

}
