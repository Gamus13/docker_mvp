<?php


// namespace App\Http\Controllers;

// use App\Models\FinalDataUser;
// use Barryvdh\DomPDF\Facade\Pdf; // Utilisation du package dompdf
// use Illuminate\Support\Facades\Log;

// class PdfGeneratorController extends Controller
// {


//     public function generatePDF()
// {
//     // Récupérer les dernières données de finaldatausers
//     $finalDataUser = FinalDataUser::latest()->first();

//     // Si aucune donnée n'est trouvée
//     if (!$finalDataUser) {
//         return redirect()->back()->with('error', 'Aucune donnée de licenciement trouvée.');
//     }

//     // Logger les données brutes avant le décodage
//     Log::info('Données JSON brutes récupérées :', ['json' => $finalDataUser->finaldatausers]);

//     // Décoder le JSON stocké
//     $jsonData = json_decode($finalDataUser->finaldatausers, true);

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



// }
namespace App\Http\Controllers;

use App\Models\WaittoPdf; // Utilisation du modèle correct
use Barryvdh\DomPDF\Facade\Pdf; // Utilisation du package dompdf
use Illuminate\Support\Facades\Log;

class PdfGeneratorController extends Controller
{
    // public function generatePDF()
    // {
    //     // Récupérer les dernières données de waitto_pdf
    //     $waittoPdf = WaittoPdf::latest()->first();

    //     // Si aucune donnée n'est trouvée
    //     if (!$waittoPdf) {
    //         return redirect()->back()->with('error', 'Aucune donnée trouvée dans WaittoPdf.');
    //     }

    //     // Logger les données brutes avant le décodage
    //     Log::info('Données JSON brutes récupérées :', ['json' => $waittoPdf->finalpdfusers]);

    //     // Décoder le JSON stocké
    //     $jsonData = json_decode($waittoPdf->finalpdfusers, true);

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
    // Récupérer les dernières données de waitto_pdf
    $waittoPdf = WaittoPdf::latest()->first();

    // Si aucune donnée n'est trouvée
    if (!$waittoPdf) {
        return redirect()->back()->with('error', 'Aucune donnée trouvée dans WaittoPdf.');
    }

    // Logger les données brutes avant le décodage
    Log::info('Données JSON brutes récupérées :', ['json' => $waittoPdf->finalpdfusers]);

    // Décoder le JSON stocké
    $jsonData = json_decode($waittoPdf->finalpdfusers, true);

    // Vérifier si le JSON est valide
    if (json_last_error() !== JSON_ERROR_NONE) {
        Log::error('Erreur de décodage JSON : ' . json_last_error_msg());
        return response()->json(['error' => 'Le JSON n\'est pas valide.'], 400);
    }

    // Logger le JSON sans échappement
    Log::info('Données JSON sans échappement :', ['json' => $jsonData]);

    // Assurez-vous que $coordonnees_employeur est une partie des données décodées
    // Par exemple, si $jsonData['coordonnees_employeur'] contient ces informations
    if (!isset($jsonData['coordonnees_employeur'])) {
        return response()->json(['error' => 'Les coordonnées de l\'employeur sont manquantes.'], 400);
    }

    // Charger la vue avec les données et générer le PDF
    $pdf = Pdf::loadView('documents.lettre_licenciement', [
        'coordonnees_employeur' => $jsonData['coordonnees_employeur'], // Passer la variable à la vue
        // Ajouter d'autres variables ici si nécessaire
    ]);

    return $pdf->download('lettre_licenciement.pdf');
}

}
