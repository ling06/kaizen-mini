<?php

namespace app\modules\course\models\queries;

/**
 * This is the ActiveQuery class for [[\app\modules\course\models\Theme]].
 *
 * @see \app\modules\course\models\Theme
 */
class ThemeQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \app\modules\course\models\Theme[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \app\modules\course\models\Theme|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
