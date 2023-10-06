<?php

namespace app\modules\course\models\queries;

use app\modules\course\models\Lesson;

/**
 * This is the ActiveQuery class for [[\app\modules\course\models\Lesson]].
 *
 * @see \app\modules\course\models\Lesson
 */
class LessonQuery extends \yii\db\ActiveQuery
{

    public function published(): self
    {
        return $this
            ->andWhere(['status' => Lesson::STATUS_PUBLISHED]);
    }

    public function notDeleted(): self
    {
        return $this
            ->andWhere(['is_deleted' => false]);
    }

}
