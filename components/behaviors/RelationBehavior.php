<?php

namespace app\components\behaviors;

use yii\base\Behavior;
use yii\db\ActiveRecord;
use yii\db\BaseActiveRecord;

/**
 * @var ActiveRecord $owner
 */
class RelationBehavior extends Behavior
{

    /*
     * [
     *   'tags' => [
     *     ['id' => 1],
     *     ['id' => 2],
     *     [
     *       'name' => 'test tag',
     *       'color' => '#0000ff',
     *     ],
     *   ]
     * ]
     */
    private $_relationData = [];

    /*
     * [
     *   'tags' => [
     *      'className' => TaskTag::class,
     *      'relationClassName' => TaskTags::class,
     *      'relation' => [
     *        User::class => 'user_id',
     *        TaskTag::class => 'task_id',
     *      ],
     *   ]
     * ]
     */
    public $relations;

    public function events(): array
    {
        return [
            BaseActiveRecord::EVENT_AFTER_INSERT => 'addRelations',
            BaseActiveRecord::EVENT_AFTER_UPDATE => 'addRelations',
            BaseActiveRecord::EVENT_BEFORE_DELETE => 'removeRelations',
        ];
    }

    public function setRelationData($relationName, $data = []): void
    {
        $this->_relationData[$relationName] = $data;
    }

    public function getRelationData($relationName)
    {
        return $this->_relationData[$relationName] ?? null;
    }

    public function addRelations(): void
    {
        foreach ($this->relations as $relationName => $relationOptions) {
            if ($relationsData = $this->getRelationData($relationName)) {

                $className = $relationOptions['className'];
                $relationClassName = $relationOptions['relationClassName'];

                // удаляем связанные модели
                $relationClassName::deleteAll([($this->owner)::primaryKey()[0] => $this->owner->primaryKey]);

                foreach ($relationsData as $relationData) {

                    $relationId = null;
                    if (!isset($relationData[$className::primaryKey()[0]])) {
                        // если не передан ключ связанной модели - создаем ее
                        $classModel = new $className();
                        $classModel->load($relationData);
                        $classModel->save();
                        $relationId = $classModel->primaryKey;
                    } else {
                        // если передан ключ связанной модели - используем его
                        $relationId = $relationData[$className::primaryKey()[0]] ?? null;
                    }

                    if ($relationId) {
                        // если есть ключ связанной модели - создаем связь
                        $relation = new $relationClassName([
                            $relationOptions[get_class($this->owner)] => $this->owner->primaryKey,
                            $relationOptions[$className] => $relationId,
                        ]);
                        $relation->save();
                    }

                }
            }
        }
    }

    public function removeRelations(): void
    {
        foreach ($this->relations as $relationName => $relationOptions) {
            if ($this->getRelationData($relationName)) {
                $relationClassName = $relationOptions['relationClassName'];
                $relationClassName::deleteAll([($this->owner)::primaryKey()[0] => $this->owner->primaryKey]);
            }
        }
    }

}
