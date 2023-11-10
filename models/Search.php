<?php

namespace app\models;

use app\modules\course\models\Chapter;
use app\modules\course\models\Lesson;
use app\modules\course\models\Theme;

/**
 * Поиск по моделям
 */
class Search
{

    /** @var int минимальная длина фразы поиска */
    public const MIN_LENGTH = 3;

    /** @var int максимальное количество записей каждого типа */
    public const MODELS_LIMIT = 15;

    /**
     * В каких классах какие поля ищем. Формат такой:
     * [
     *   targetClass - класс модели, string
     *   targetAttribute - по каким полям вести поиск, string|array
     *   <fields> - какие поля должны фигурировать в выдаче, string|array
     *   <scopes> - дополнительные условия выборки, array
     * ]
     * @return array[]
     */
    public static function getSearchTargets(): array
    {
        return [
            'chapters' => [
                'targetClass' => Chapter::class,
                'targetAttribute' => 'title',
                'fields' => ['id', 'title'],
                'scopes' => ['published', 'notDeleted'],
            ],
            'themes' => [
                'targetClass' => Theme::class,
                'targetAttribute' => 'title',
                'fields' => ['id', 'title'],
                'scopes' => ['published', 'notDeleted'],
            ],
            'lessons' => [
                'targetClass' => Lesson::class,
                'targetAttribute' => ['title', 'description'],
                'fields' => ['id', 'title', 'description'],
                'scopes' => ['published', 'notDeleted'],
            ],
        ];
    }

    /**
     * Найти записи
     * @param string $text
     * @return array
     */
    public static function search(string $text): array
    {
        $text = preg_replace('/\W/u', '', $text);

        if (mb_strlen($text) < static::MIN_LENGTH) return [];

        $results = [];
        foreach (static::getSearchTargets() as $key => $target) {
            $query = $target['targetClass']::find();
            if (is_array($target['targetAttribute'])) {
                $queryParams = ['OR'];
                foreach ($target['targetAttribute'] as $attribute) {
                    $queryParams[] = ['like', $attribute, $text];
                }
                $query->where($queryParams);
            } else {
                $query->where(['like', $target['targetAttribute'], $text]);
            }

            if (!empty($target['fields'])) {
                $query->select($target['fields']);
            }

            if (!empty($target['scopes'])) {
                foreach ($target['scopes'] as $scope) {
                    $query->$scope();
                }
            }

            $results[$key] = $query->limit(static::MODELS_LIMIT)->asArray()->all();
        }

        return $results;
    }

}
