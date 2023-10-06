<?php

namespace app\modules\course\models\queries;

use app\modules\course\models\Course;

/**
 * This is the ActiveQuery class for [[\app\modules\course\models\Course]].
 *
 * @see \app\modules\course\models\Course
 */
class CourseQuery extends \yii\db\ActiveQuery
{

    public function published(): self
    {
        return $this
            ->andWhere(['status' => Course::STATUS_PUBLISHED]);
    }

    public function notDeleted(): self
    {
        return $this
            ->andWhere(['is_deleted' => false]);
    }

}
