<?php

namespace app\modules\course\models\queries;

/**
 * This is the ActiveQuery class for [[\app\modules\course\models\Chapter]].
 *
 * @see \app\modules\course\models\Chapter
 */
class ChapterQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \app\modules\course\models\Chapter[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \app\modules\course\models\Chapter|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
