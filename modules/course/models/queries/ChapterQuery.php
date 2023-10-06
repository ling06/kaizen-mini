<?php

namespace app\modules\course\models\queries;

/**
 * This is the ActiveQuery class for [[\app\modules\course\models\Chapter]].
 *
 * @see \app\modules\course\models\Chapter
 */
class ChapterQuery extends \yii\db\ActiveQuery
{

    public function published(): self
    {
        return $this;
    }

    public function notDeleted(): self
    {
        return $this
            ->andWhere(['is_deleted' => false]);
    }

}
