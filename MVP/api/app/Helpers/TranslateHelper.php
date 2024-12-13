<?php

namespace App\Helpers;

use Stichoza\GoogleTranslate\GoogleTranslate;
use Illuminate\Support\Facades\Cache;

class TranslateHelper
{
    public static function translateText(string $text, string $targetLanguage): string
    {
        // Générer une clé de cache pour éviter les traductions répétées
        $cacheKey = md5($text . '_' . $targetLanguage);

        // Vérifiez si la traduction est déjà dans le cache
        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        // Traduire le texte
        $translator = new GoogleTranslate($targetLanguage);
        $translatedText = $translator->translate($text);

        // Mettre en cache la traduction pendant 1 heure
        Cache::put($cacheKey, $translatedText, 3600);

        return $translatedText;
    }
}
