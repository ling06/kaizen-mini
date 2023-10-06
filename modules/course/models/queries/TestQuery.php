<?php

namespace app\modules\course\models\queries;

/**
 * This is the ActiveQuery class for [[\app\modules\course\models\Test]].
 *
 * @see \app\modules\course\models\Test
 */
class TestQuery extends \yii\db\ActiveQuery
{

    public function active(): self
    {
        return $this->andWhere(['is_active' => true]);
    }

}
