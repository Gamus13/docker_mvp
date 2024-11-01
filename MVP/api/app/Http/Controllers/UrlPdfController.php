<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\WebToPdfService;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Log;
use App\Jobs\ProcessTextExtraction;
use Illuminate\Support\Facades\Http;
use App\Models\UrlPdf;
use App\Models\Embeddingsurl;
use App\Models\FinalDataUser;
use App\Models\ObjetDocument;
use App\Models\GeneratePdf; // Import du modèle
use Illuminate\Support\Str;
use App\Models\ContextUser;



class UrlPdfController extends Controller
{
    //
    public function __construct(WebToPdfService $webToPdfService)
    {
        $this->webToPdfService = $webToPdfService;
    }

    // public function convert(Request $request)
    // {
    //     $url = $request->input('url');
    //     $result = $this->webToPdfService->convertUrlToPdf($url);

    //     if (!is_array($result)) {
    //         return response()->json(['error' => 'Unexpected response format'], 500);
    //     }

    //     if (isset($result['error']) && $result['error']) {
    //         return response()->json(['error' => $result['message']], 500);
    //     }

    //     // Créez une nouvelle instance de UrlPdf
    //     $urlPdf = UrlPdf::create([
    //         'pdf_path' => $result['file_path'] ?? '',
    //         'title' => $result['file_url'] ?? '',
    //     ]);

    //     // Déclenche le processus de traitement en arrière-plan
    //     Queue::push(new ProcessTextExtraction($urlPdf));

    //     // Appeler la méthode index pour récupérer toutes les colonnes 'document'
    //     return $this->index();
    // }

    public function convert(Request $request)
    {
        // Valider l'URL entrée
        $request->validate([
            'url' => 'required|url', // Validation de l'URL
        ]);

        $url = $request->input('url');
        $result = $this->webToPdfService->convertUrlToPdf($url);

        if (!is_array($result)) {
            return response()->json(['error' => 'Unexpected response format'], 500);
        }

        if (isset($result['error']) && $result['error']) {
            return response()->json(['error' => $result['message']], 500);
        }

        // Créez une nouvelle instance de UrlPdf
        $urlPdf = UrlPdf::create([
            'pdf_path' => $result['file_path'] ?? '',
            'title' => $result['file_url'] ?? '',
            'user_id' => $request->user()->id, // Associez à l'utilisateur connecté
        ]);

        // Déclenche le processus de traitement en arrière-plan
        Queue::push(new ProcessTextExtraction($urlPdf));

        // Appeler la méthode index pour récupérer toutes les colonnes 'document'
        return $this->index();
    }


    public function index()
    {
        // Récupérer tout le contenu de la colonne 'document' de la table 'embeddingsurl'
        $documents = Embeddingsurl::pluck('document');

        // Nettoyer les documents pour retirer ou remplacer les caractères spéciaux
        $cleanedDocuments = $documents->map(function ($document) {
            return $this->cleanText($document);
        });

        // Retourner les documents nettoyés sans répondre en JSON, pour un traitement ultérieur
        return $cleanedDocuments;
    }

    private function cleanText($text)
    {
        // Exemple de nettoyage : supprimer les caractères spéciaux
        return preg_replace('/[^A-Za-z0-9\s]/', '', $text);
    }

}
