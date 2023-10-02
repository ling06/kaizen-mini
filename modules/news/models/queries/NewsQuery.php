<?php

namespace app\modules\news\models\queries;

use app\modules\news\models\News;

/**
 * This is the ActiveQuery class for [[News]].
 *
 * @see News
 */
class NewsQuery extends \yii\db\ActiveQuery
{

    public function published(): self
    {
        return $this
            ->andWhere(['status' => News::STATUS_PUBLISHED])
            ->andWhere(['<=', 'date', date('Y-m-d H:i:s')]);
    }

    public function notDeleted(): self
    {
        return $this
            ->andWhere(['is_deleted' => false]);
    }

}
