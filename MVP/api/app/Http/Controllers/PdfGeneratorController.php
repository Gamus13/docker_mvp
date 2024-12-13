<?php


namespace App\Http\Controllers;

use App\Models\ObjetDocument;
use App\Models\FinalDataUser;
use App\Models\FinalPdfUser;
use App\Models\WaittoPdf;
use App\Models\UpdatedPdfDocument;
use App\Models\GeneratedPdf;
use App\Models\PdfRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf; // Utilisation du package dompdf
use Illuminate\Support\Facades\Log;



class PdfGeneratorController extends Controller
{


    public function generateMultiplePdfsFromTemplates($userId)
    {
        // Récupérer les données du modèle ObjetDocument pour obtenir le documentType
        $objetDocument = ObjetDocument::where('user_id', $userId)->latest()->first();

        // Si aucun ObjetDocument n'est trouvé pour cet utilisateur
        if (!$objetDocument) {
            Log::error("Aucun ObjetDocument trouvé pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucun type de document trouvé pour cet utilisateur.'], 404);
        }

        // Récupérer le type de document associé à cet utilisateur
        $documentType = $objetDocument->document_type;

        // Récupérer les dernières données de FinalPdfUser
        $finalPdfUser = FinalPdfUser::where('user_id', $userId)->latest()->first();


        // Si aucune donnée n'est trouvée
        if (!$finalPdfUser) {
            Log::error("Aucune donnée FinalPdfUser trouvée pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucune donnée trouvée pour cet utilisateur.'], 404);
        }

        // Décoder le JSON stocké
        $jsonData = json_decode($finalPdfUser->finalpdf, true);

        // Log pour vérifier le contenu du JSON décodé
        Log::info("Données JSON décodées pour l'utilisateur ID {$userId} :", $jsonData);

        // Vérifier si le JSON est valide
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Erreur de décodage JSON : ' . json_last_error_msg());
            return response()->json(['error' => 'Le JSON n\'est pas valide.'], 400);
        }

        // Définir le chemin du dossier des templates en fonction du type de document
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

        $generatedPdfs = [];

        // Parcourir chaque fichier de template et générer un PDF
        foreach ($templates as $templatePath) {
            // Extraire le nom du fichier template (sans extension)
            $templateName = basename($templatePath, '.blade.php');

            // Log pour vérifier les données passées à la vue Blade
            Log::info("Données transmises à la vue {$templateName} pour l'utilisateur ID {$userId} :", $jsonData);

            // Charger la vue avec les données et générer le PDF
            try {
                // $pdf = Pdf::loadView("{$documentType}.{$templateName}", $jsonData);
                $pdf = Pdf::loadView("{$documentType}.{$templateName}", ['data' => $jsonData]);

                // Générer le contenu du PDF en mémoire
                $pdfOutput = $pdf->output();

                // Définir un nom unique pour chaque fichier PDF
                $fileName = "{$templateName}_" . time() . '.pdf';

                // Enregistrer le PDF dans le dossier public 'storage/app/public/documents'
                Storage::disk('public')->put('documents/' . $fileName, $pdfOutput);
                Log::info('PDF stocké avec succès dans : ' . 'documents/' . $fileName);

                // Obtenir l'URL du fichier PDF stocké
                $pdfUrl = Storage::url('documents/' . $fileName);

                // Enregistrer les détails du PDF dans la base de données en associant l'ID utilisateur
                GeneratedPdf::create([
                    'name' => $fileName, // Nom du fichier
                    'path' => $pdfUrl,   // Chemin ou URL du PDF
                    'user_id' => $userId, // Enregistrement de l'ID utilisateur
                ]);
                Log::info("PDF {$fileName} enregistré avec succès dans la base de données.");

                // Ajouter l'URL du PDF généré à la liste des PDF générés
                $generatedPdfs[] = $pdfUrl;

            } catch (\Exception $e) {
                Log::error("Erreur lors de la génération ou de l'enregistrement du PDF {$templateName} : " . $e->getMessage());
                return response()->json(['error' => 'Erreur lors de la génération des PDFs.'], 500);
            }
        }

        // Retourner une réponse avec les URLs des PDF générés
        return response()->json([
            'message' => 'PDFs générés et stockés avec succès.',
            'pdf_urls' => $generatedPdfs,
        ]);
    }

    // Récupérer tous les PDF creer par un utilisateur
    public function index()
    {
        // Récupérer tous les PDF stockés pour l'utilisateur authentifié
        $pdfs = GeneratedPdf::where('user_id', Auth::id())->get();

        // Retourner une réponse JSON avec les PDF
        return response()->json($pdfs);
    }

//     public function generatePDFFromFinalPdfUser()
// {
//     // Récupérer les dernières données de finalpdfusers
//     $finalPdfUser = WaittoPdf::latest()->first(); // Remplacez FinalPdfUser par WaittoPdf

//     // Si aucune donnée n'est trouvée
//     if (!$finalPdfUser) {
//         return redirect()->back()->with('error', 'Aucune donnée de licenciement trouvée.');
//     }

//     // Logger les données brutes avant le décodage
//     Log::info('Données JSON brutes récupérées :', ['json' => $finalPdfUser->finalpdfusers]); // Utilisez finalpdfusers

//     // Décoder le JSON stocké
//     $jsonData = json_decode($finalPdfUser->finalpdfusers, true); // Utilisez finalpdfusers

//     // Vérifier si le JSON est valide
//     if (json_last_error() !== JSON_ERROR_NONE) {
//         Log::error('Erreur de décodage JSON : ' . json_last_error_msg());
//         return response()->json(['error' => 'Le JSON n\'est pas valide.'], 400);
//     }

//     // Logger le JSON sans échappement
//     Log::info('Données JSON sans échappement :', ['json' => $jsonData]);

//     // Charger la vue avec les données et générer le PDF
//     $pdf = Pdf::loadView('documents.lettre_licenciement', $jsonData);
//     return $pdf->download('lettre_licenciement.pdf');
// }


    public function generatePDF()
    {
        // Récupérer les dernières données de finaldatausers
        $finalDataUser = FinalDataUser::latest()->first();

        // Si aucune donnée n'est trouvée
        if (!$finalDataUser) {
            return redirect()->back()->with('error', 'Aucune donnée de licenciement trouvée.');
        }

        // Logger les données brutes avant le décodage
        Log::info('Données JSON brutes récupérées :', ['json' => $finalDataUser->finaldatausers]);

        // Décoder le JSON stocké
        $jsonData = json_decode($finalDataUser->finaldatausers, true);

        // Vérifier si le JSON est valide
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Erreur de décodage JSON : ' . json_last_error_msg());
            return response()->json(['error' => 'Le JSON n\'est pas valide.'], 400);
        }

        // Logger le JSON sans échappement
        Log::info('Données JSON sans échappement :', ['json' => $jsonData]);

        // Charger la vue avec les données et générer le PDF
        $pdf = Pdf::loadView('documents.lettre_licenciement', $jsonData);
        return $pdf->download('lettre_licenciement.pdf');
    }

    public function updateDocumentData(Request $request, $userId)
    {
        // Récupérer les données du modèle ObjetDocument pour obtenir le documentType
        $objetDocument = ObjetDocument::where('user_id', $userId)->latest()->first();

        // Si aucun ObjetDocument n'est trouvé pour cet utilisateur
        if (!$objetDocument) {
            Log::error("Aucun ObjetDocument trouvé pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucun type de document trouvé pour cet utilisateur.'], 404);
        }

        // Récupérer le type de document associé à cet utilisateur
        $documentType = $objetDocument->document_type;

        // Récupérer les dernières données de FinalPdfUser
        $finalPdfUser = FinalPdfUser::where('user_id', $userId)->latest()->first();

        // Si aucune donnée n'est trouvée
        if (!$finalPdfUser) {
            Log::error("Aucune donnée FinalPdfUser trouvée pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucune donnée trouvée pour cet utilisateur.'], 404);
        }

        // Décoder le JSON stocké
        $jsonData = json_decode($finalPdfUser->finalpdf, true);

        // Log pour vérifier le contenu du JSON décodé
        Log::info("Données JSON décodées pour l'utilisateur ID {$userId} :", $jsonData);

        // Mise à jour des valeurs des produits selon les entrées de l'utilisateur
        $updatedItems = $request->input('items', []);

        // Parcourir les produits à mettre à jour ou à ajouter
        foreach ($updatedItems as $index => $updatedItem) {
            if (isset($jsonData['invoice']['items'][$index])) {
                // Si l'élément existe déjà, on le met à jour
                $jsonData['invoice']['items'][$index]['service'] = $updatedItem['service'];
                $jsonData['invoice']['items'][$index]['description'] = $updatedItem['description'];
                $jsonData['invoice']['items'][$index]['rate'] = $updatedItem['rate'];
                $jsonData['invoice']['items'][$index]['quantity'] = $updatedItem['quantity'];
                $jsonData['invoice']['items'][$index]['amount'] = $updatedItem['amount'];

                Log::info("Produit mis à jour pour l'utilisateur ID {$userId} - Index {$index} :", $jsonData['invoice']['items'][$index]);
            } else {
                // Si l'élément n'existe pas, on l'ajoute
                $jsonData['invoice']['items'][] = $updatedItem;

                Log::info("Produit ajouté pour l'utilisateur ID {$userId} :", $updatedItem);
            }
        }

        // Calculer la somme totale des montants (subtotal)
        $subtotal = 0;
        foreach ($jsonData['invoice']['items'] as $item) {
            $subtotal += (float) $item['amount'];
        }

        // Mettre à jour la valeur de subtotal dans le JSON
        $jsonData['invoice']['totals']['subtotal'] = number_format($subtotal, 2, '.', '');

        // Log du nouveau sous-total pour vérifier
        Log::info("Sous-total calculé pour l'utilisateur ID {$userId} :", ['subtotal' => $jsonData['invoice']['totals']['subtotal']]);

        // Réencoder les modifications JSON
        $updatedJsonData = json_encode($jsonData);

        // Sauvegarder les modifications dans la nouvelle table UpdatedPdfDocument
        $updatedPdfDocument = UpdatedPdfDocument::create([
            'user_id' => $userId,
            'document_type' => $documentType,
            'updated_pdf_data' => $updatedJsonData,
        ]);

        // Log du JSON mis à jour
        Log::info("Données JSON mises à jour avec le sous-total pour l'utilisateur ID {$userId} :", $jsonData);

        // Appel direct de la méthode show
        return $this->show($userId);
    }



    public function show($userId)
    {

        // 1-) Récupérer les données du modèle ObjetDocument pour obtenir le documentType
        $objetDocument = ObjetDocument::where('user_id', $userId)->latest()->first();

        // Si aucun ObjetDocument n'est trouvé pour cet utilisateur
        if (!$objetDocument) {
            Log::error("Aucun ObjetDocument trouvé pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucun type de document trouvé pour cet utilisateur.'], 404);
        }

        // Récupérer le type de document associé à cet utilisateur
        $documentType = $objetDocument->document_type;

        // 2-) Récupérer les dernières données de UpdatedPdfDocument
        $updatedPdfDocument = UpdatedPdfDocument::where('user_id', $userId)->latest()->first();


        // Si aucune donnée n'est trouvée
        if (!$updatedPdfDocument) {
            Log::error("Aucune donnée UpdatedPdfDocument trouvée pour l'utilisateur ID : {$userId}");
            return response()->json(['error' => 'Aucune donnée trouvée pour cet utilisateur.'], 404);
        }


        // Décoder le JSON stocké
        $jsonData = json_decode($updatedPdfDocument->updated_pdf_data, true);

        // Log pour vérifier le contenu du JSON décodé
        Log::info("Données JSON décodées pour l'utilisateur ID {$userId} :", $jsonData);

        // Vérifier si le JSON est valide
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Erreur de décodage JSON : ' . json_last_error_msg());
            return response()->json(['error' => 'Le JSON n\'est pas valide.'], 400);
        }

        // Définir le chemin du dossier des templates en fonction du type de document
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

        $pdfRecords = [];

        // Parcourir chaque fichier de template et générer un PDF
        foreach ($templates as $templatePath) {
            // Extraire le nom du fichier template (sans extension)
            $templateName = basename($templatePath, '.blade.php');

            // Log pour vérifier les données passées à la vue Blade
            Log::info("Données transmises à la vue {$templateName} pour l'utilisateur ID {$userId} :", $jsonData);

            // Charger la vue avec les données et générer le PDF
            try {
                // Générer le PDF
                $pdf = Pdf::loadView("{$documentType}.{$templateName}", ['data' => $jsonData]);

                // Générer le contenu du PDF en mémoire
                $pdfOutput = $pdf->output();

                // Définir un nom unique pour chaque fichier PDF
                $fileName = "{$templateName}_" . time() . '.pdf';

                // Enregistrer le PDF dans le dossier public 'storage/app/public/documents'
                Storage::disk('public')->put('documentsupdate/' . $fileName, $pdfOutput);
                Log::info('PDF stocké avec succès dans : ' . 'documentsupdate/' . $fileName);

                // Obtenir l'URL du fichier PDF stocké
                $pdfUrlupdate = Storage::url('documentsupdate/' . $fileName);

                // Enregistrer les détails du PDF dans la base de données en associant l'ID utilisateur
                PdfRecord::create([
                    'name' => $fileName, // Nom du fichier
                    'path' => $pdfUrlupdate,   // Chemin ou URL du PDF
                    'user_id' => $userId, // Enregistrement de l'ID utilisateur
                ]);
                Log::info("PDF {$fileName} enregistré avec succès dans la base de données.");

                // Ajouter l'URL du PDF généré à la liste des PDF générés

                $pdfRecords[] = $pdfUrlupdate;

            } catch (\Exception $e) {
                Log::error("Erreur lors de la génération ou de l'enregistrement du PDF {$templateName} : " . $e->getMessage());
                return response()->json(['error' => 'Erreur lors de la génération des PDFs.'], 500);
            }
        }

        // Retourner une réponse avec les URLs des PDF générés
        return response()->json([
            'message' => 'PDFs générés et stockés avec succès.',
            'pdf_urls' => $pdfRecords,
        ]);
    }


    public function indexupdate()
    {
        // Récupérer tous les PDF stockés pour l'utilisateur authentifié
        $pdfs = PdfRecord::where('user_id', Auth::id())->get();

        // Retourner une réponse JSON avec les PDF
        return response()->json($pdfs);
    }


    // Méthode pour récupérer tous les PDFs créés par un utilisateur spécifique
    public function getAllUserPdfs($userId)
    {
        // Récupère tous les PDFs associés à l'utilisateur
        $pdfs = GeneratedPdf::where('user_id', $userId)->get();

        // Retourne les PDFs en réponse JSON
        return response()->json($pdfs);
    }
}

