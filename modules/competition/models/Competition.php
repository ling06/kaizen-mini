<?php

namespace app\modules\competition\models;

use app\components\behaviors\DeleteSoftBehavior;
use app\models\queries\UserQuery;
use app\models\User;
use app\modules\competition\models\queries\CompetitionQuery;
use yii\behaviors\BlameableBehavior;

/**
 * This is the model class for table "competition".
 *
 * @property int $id
 * @property int|null $user_id Id автора
 * @property string|null $title Заголовок
 * @property string|null $text Полный текст
 * @property string|null $link Ссылка на Борбозу
 * @property string|null $date Дата публикации
 * @property int $status [int(4)]  Статус
 * @property bool $is_deleted [tinyint(1)]
 *
 * @property User $user
 */
class Competition extends \app\components\ActiveRecord
{

    public const PERMISSION_READ = 'competition-read';
    public const PERMISSION_CREATE = 'competition-create';
    public const PERMISSION_UPDATE = 'competition-update';
    public const PERMISSION_DELETE = 'competition-delete';

    public const STATUS_DRAFT = 0;
    public const STATUS_PUBLISHED = 1;

    public static function getExtraFields(): array
    {
        return [
            'user' => static function ($model) {
                return $model->getUser()->select('id, name')->one();
            },
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'competition';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['status'], 'in', 'range' => [static::STATUS_DRAFT, static::STATUS_PUBLISHED]],
            [['text'], 'string'],
            [['date'], 'safe'],
            [['title', 'link'], 'string', 'max' => 250],
            [['is_deleted'], 'boolean'],
            [['status'], 'default', 'value' => static::STATUS_DRAFT],
            [['date'], 'default', 'value' => date('Y-m-d H:i:s')],
            [['is_deleted'], 'default', 'value' => false],
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
     * @return CompetitionQuery the active query used by this AR class.
     */
    public static function find(): CompetitionQuery
    {
        return new CompetitionQuery(static::class);
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
        ];
    }

}
