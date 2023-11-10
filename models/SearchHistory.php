<?php

namespace app\models;

use Yii;

/**
 * История поиска пользователя. Хранится в session.
 */
class SearchHistory
{

    /** @var string ключ сессии для хранения истории поиска */
    public const SESSION_KEY = 'searchHistory';

    /** @var int максимальная длина истории поиска */
    public const MAX_LENGTH = 15;

    /**
     * Получить всю историю поиска
     * @return array
     */
    public static function get(): array
    {
        return Yii::$app->session
            ? Yii::$app->session->get(static::SESSION_KEY, [])
            : [];
    }

    /**
     * Установить историю поиска
     * @param array $history
     * @return void
     */
    public static function set(array $history): void
    {
        if (Yii::$app->session) {
            Yii::$app->session->set(static::SESSION_KEY, $history);
        }
    }

    /**
     * Добавить фразу в начало истории
     * @param string $text
     * @return void
     */
    public static function add(string $text): void
    {
        $history = static::get();
        array_unshift($history, $text);
        $history = array_slice(array_unique($history), 0, static::MAX_LENGTH);
        static::set($history);
    }

    /**
     * Пуста ли история поиска
     * @return bool
     */
    public static function isEmpty(): bool
    {
        return static::get() === [];
    }

    /**
     * Очистить историю поиска
     * @return void
     */
    public static function clear(): void
    {
        if (Yii::$app->session) {
            Yii::$app->session->set(static::SESSION_KEY, []);
        }
    }

}
