<?php

namespace app\modules\competition\models\queries;

use app\modules\competition\models\Competition;

/**
 * This is the ActiveQuery class for [[Competition]].
 *
 * @see Competition
 */
class CompetitionQuery extends \yii\db\ActiveQuery
{

    public function published(): self
    {
        return $this
            ->andWhere(['status' => Competition::STATUS_PUBLISHED])
            ->andWhere(['<=', 'date', date('Y-m-d H:i:s')]);
    }

    public function notDeleted(): self
    {
        return $this
            ->andWhere(['is_deleted' => false]);
    }

}
