<?php


namespace App\Http\Controllers;

use App\Models\FinalDataUser;
use App\Models\FinalPdfUser;
use App\Models\WaittoPdf;
use Illuminate\Http\JsonResponse;
use Barryvdh\DomPDF\Facade\Pdf; // Utilisation du package dompdf
use Illuminate\Support\Facades\Log;

class PdfGeneratorController extends Controller
{
    public function generatePDFFromFinalPdfUser()
    {
        // Récupérer les dernières données de finalpdfusers
        $finalPdfUser = FinalPdfUser::latest()->first();

        // Si aucune donnée n'est trouvée
        if (!$finalPdfUser) {
            return redirect()->back()->with('error', 'Aucune donnée de licenciement trouvée.');
        }

        // Logger les données brutes avant le décodage
        Log::info('Données JSON brutes récupérées :', ['json' => $finalPdfUser->finalpdf]);

        // Décoder le JSON stocké
        $jsonData = json_decode($finalPdfUser->finalpdf, true);

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







}

