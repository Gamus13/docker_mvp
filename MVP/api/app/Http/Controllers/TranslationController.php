<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ObjetDocument;
use App\Models\FinalPdfUser;
use App\Models\DocumentTranslate;
use Log;
use Storage;
use Barryvdh\DomPDF\Facade\Pdf; // Utilisation du package dompdf
use App\Helpers\TranslateHelper; // Assurez-vous d'importer TranslateHelper

class TranslationController extends Controller
{
    public function translateJson(Request $request)
    {
        $userId = auth()->id(); // Supposons que l'utilisateur est authentifié

        // Récupérer les données du modèle ObjetDocument
        $objetDocument = ObjetDocument::where('user_id', $userId)->latest()->first();

        if (!$objetDocument) {
            Log::error("Aucun ObjetDocument trouvé pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucun type de document trouvé pour cet utilisateur.'], 404);
        }

        // Récupérer le type de document associé
        $documentType = $objetDocument->document_type;

        // Récupérer les dernières données de FinalPdfUser
        $finalPdfUser = FinalPdfUser::where('user_id', $userId)->latest()->first();

        if (!$finalPdfUser) {
            Log::error("Aucune donnée FinalPdfUser trouvée pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucune donnée trouvée pour cet utilisateur.'], 404);
        }

        // Décoder le JSON stocké
        $jsonData = json_decode($finalPdfUser->finalpdf, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Erreur de décodage JSON : ' . json_last_error_msg());
            return response()->json(['error' => 'Le JSON n\'est pas valide.'], 400);
        }

        Log::info("Données JSON décodées pour l'utilisateur ID {$userId} :", $jsonData);

        // Traduire le JSON
        $language = $request->input('language', 'en'); // Langue cible par défaut
        $translatedJson = $this->translateArray($jsonData, $language);

        Log::info("Données JSON traduites pour l'utilisateur ID {$userId} :", $translatedJson);

        // Récupérer le chemin du dossier des templates en fonction du type de document
        $templateDirectory = resource_path("views/{$documentType}");

        // Vérifier si le dossier existe
        if (!is_dir($templateDirectory)) {
            Log::error("Le dossier pour {$documentType} n'existe pas.");
            return response()->json(['error' => "Le dossier pour {$documentType} n'existe pas."], 404);
        }

        // Récupérer tous les fichiers .blade.php dans le dossier
        $templates = glob($templateDirectory . '/*.blade.php');

        // Si aucun template n'est trouvé
        if (empty($templates)) {
            Log::error("Aucun template trouvé dans le dossier {$templateDirectory}.");
            return response()->json(['error' => 'Aucun template trouvé.'], 404);
        }

        $generatedPdfs = []; // Initialiser la variable avant la boucle

        // Parcourir chaque fichier de template et générer un PDF
        foreach ($templates as $templatePath) {
            // Extraire le nom du fichier template (sans extension)
            $templateName = basename($templatePath, '.blade.php');

            // Log pour vérifier les données passées à la vue Blade
            Log::info("Données transmises à la vue {$templateName} pour l'utilisateur ID {$userId} :", $translatedJson);

            // Charger la vue avec les données traduites et générer le PDF
            try {
                // Utiliser directement les données sans tableau enveloppant
                $pdf = Pdf::loadView("{$documentType}.{$templateName}", ['data' => $translatedJson]);

                // Générer le contenu du PDF en mémoire
                $pdfOutput = $pdf->output();

                // Définir un nom unique pour chaque fichier PDF
                $fileName = "{$templateName}_" . uniqid() . '.pdf'; // Utilisation de uniqid() pour plus d'unicité

                // Enregistrer le PDF dans le dossier public 'storage/app/public/documentstranslate'
                Storage::disk('public')->put('documentstranslate/' . $fileName, $pdfOutput);
                Log::info('PDF stocké avec succès dans : ' . 'documentstranslate/' . $fileName);

                // Obtenir l'URL du fichier PDF stocké
                $pdfUrl = Storage::url('documentstranslate/' . $fileName);

                // Enregistrer les détails du PDF dans la base de données en associant l'ID utilisateur
                DocumentTranslate::create([
                    'name' => $fileName, // Nom du fichier
                    'path' => $pdfUrl,   // Chemin ou URL du PDF
                    'user_id' => $userId, // Enregistrement de l'ID utilisateur
                ]);
                Log::info("PDF {$fileName} enregistré avec succès dans la base de données.");

                // Ajouter l'URL du PDF généré à la liste des PDF générés
                $generatedPdfs[] = $pdfUrl; // Correction de la variable utilisée ici

            } catch (\Exception $e) {
                Log::error("Erreur lors de la génération ou de l'enregistrement du PDF {$templateName} : " . $e->getMessage());
                return response()->json(['error' => 'Erreur lors de la génération des PDFs.'], 500);
            }
        }

        // Retourner une réponse avec les URLs des PDF générés
        return response()->json([
            'message' => 'PDFs générés et stockés avec succès.',
            'pdf_urls' => $generatedPdfs, // Assurez-vous de retourner la bonne variable
        ]);
    }

    private function translateArray(array $data, string $language): array
    {
        return array_map(function ($value) use ($language) {
            if (is_array($value)) {
                return $this->translateArray($value, $language);
            }

            return is_string($value) ? TranslateHelper::translateText($value, $language) : $value;
        }, $data);
    }

    public function indextranslate()
    {
        // Récupérer tous les PDF stockés pour l'utilisateur authentifié
        $pdfs = DocumentTranslate::where('user_id', Auth::id())->get();

        // Retourner une réponse JSON avec les PDF
        return response()->json($pdfs);
    }
}
