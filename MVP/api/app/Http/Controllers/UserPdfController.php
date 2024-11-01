<?php

namespace App\Http\Controllers;


use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use App\Services\WebToPdfService;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use App\Jobs\ProcessUsersExtraction;
use Illuminate\Support\Facades\Log;
use App\Models\Userpdf;
use App\Models\Embeddingsusers;


class UserPdfController extends Controller
{
    //

    public function upload(Request $request)
    {
        // Valider la demande
        $request->validate([
            'file' => 'required|mimes:pdf|max:20480', // Max 20MB
        ]);

        // Obtenir le fichier uploadé
        $file = $request->file('file');

        // Déterminer le chemin de stockage dans le dossier 'userspdf'
        $filePath = $file->store('userspdf', 'public');
        $fileUrl = Storage::url($filePath);

        // Créez une nouvelle instance de Userpdf
        $userpdf = Userpdf::create([
            'userpdf_path' => storage_path('app/public/' . $filePath),
            'usertitle' => $file->getClientOriginalName(),
            'user_id' => $request->user()->id, // Associez à l'utilisateur connecté
        ]);

        // Déclenche le processus de traitement en arrière-plan
        Queue::push(new ProcessUsersExtraction($userpdf));

        // Appeler la méthode index pour récupérer toutes les colonnes 'document'
        return $this->index();
    }

    public function index()
    {
        // Récupérer tout le contenu de la colonne 'document' de la table 'embeddingsurl'
        $datausers = Embeddingsusers::pluck('document'); // Récupère uniquement la colonne 'document'

        // Ajouter un log pour vérifier que les données ont bien été récupérées
        Log::info('Index: Documents récupérés depuis la base de données.', ['datausers' => $datausers]);

        // Rediriger vers createContext en passant les documents dans la session
        return redirect()->route('documents.createContext')
                        ->with('datausers', $datausers);
    }

}
