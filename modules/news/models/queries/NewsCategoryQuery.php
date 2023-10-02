<?php

namespace app\modules\news\models\queries;

use app\modules\news\models\NewsCategory;

/**
 * This is the ActiveQuery class for [[NewsCategory]].
 *
 * @see NewsCategory
 */
class NewsCategoryQuery extends \yii\db\ActiveQuery
{

    public function notDeleted(): self
    {
        return $this
            ->andWhere(['is_deleted' => false]);
    }

}
