<?php
// Lire les données JSON brutes à partir de l'entrée standard
$jsonData = file_get_contents('php://stdin');

// Log des données JSON brutes
error_log('Données JSON brutes reçues : ' . $jsonData);

// Supprimer les caractères de contrôle
$jsonData = preg_replace('/[\x00-\x1F\x7F]/u', '', $jsonData);

// Vérifier l'encodage
if (!mb_check_encoding($jsonData, 'UTF-8')) {
    fwrite(STDERR, 'Erreur d\'encodage : le JSON n\'est pas en UTF-8.' . PHP_EOL);
    exit(1);
}

// Décoder la chaîne JSON
$data = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    fwrite(STDERR, 'Erreur de décodage JSON externe : ' . json_last_error_msg() . PHP_EOL);
    exit(1);
}

// Log des données JSON décodées
error_log('Données JSON décodées : ' . print_r($data, true));

// Supprimer les caractères d'échappement
$cleanedJsonString = stripslashes($data['json']);

// Log des données JSON nettoyées
error_log('Données JSON nettoyées : ' . $cleanedJsonString);

// Décoder la chaîne JSON nettoyée
$cleanedData = json_decode($cleanedJsonString, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    fwrite(STDERR, 'Erreur de décodage JSON interne : ' . json_last_error_msg() . PHP_EOL);
    exit(1);
}

// Encoder les données modifiées en JSON avec l'option JSON_UNESCAPED_UNICODE
$cleanedJsonData = json_encode($cleanedData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// Log des données JSON finales
error_log('Données JSON finales : ' . $cleanedJsonData);

// Afficher les données JSON nettoyées
echo $cleanedJsonData;
?>
