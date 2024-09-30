<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Jobs\ProcessMistralAIJob;
use App\Models\UserDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Embeddingsusers;
use App\Models\Embeddingsurl;
use App\Models\FinalDataUser;
use App\Models\JsonData;


class UserDocumentController extends Controller
{

    // Définir le modèle du chat ici
    protected $chat_model = 'mistral-small-latest';
    private static string $embedding_model = 'mistral-embed';

    // Pour stocker un nouveau document

    public function store(Request $request)
    {
        // Valider que le champ 'data' est un tableau
        $request->validate([
            'data' => 'required|array', // On valide qu'il s'agit d'un tableau
        ]);

        // Créer le document en sauvegardant directement le tableau
        $userDocument = UserDocument::create([
            'data' => $request->data // Laravel cast automatiquement en JSON
        ]);

        return response()->json($userDocument, 201);
    }



    public function show($key)
    {
        // Chercher dans la table UserDocument où le champ JSON "data->objet" correspond à la clé fournie
        $userDocument = UserDocument::whereJsonContains('data->objet', $key)->first();

        // Si un document est trouvé
        if ($userDocument) {
            // Stocker le contenu JSON dans jsonaddata
            JsonData::create([
                'jsondocxusers' => json_encode($userDocument->data) // Assurez-vous que les données sont au format JSON
            ]);

            return response()->json($userDocument->data);
        }

        // Si aucun document n'est trouvé, on retourne un message d'erreur
        return response()->json(['message' => 'Document non trouvé'], 404);
    }




    // envoyer les donnees vers le jobs
    // public function createContext()
    // {
    //     // Récupérer toutes les données de la colonne document de la table 'embeddingsurl'
    //     $documentsUrl = Embeddingsurl::pluck('document')->toArray();

    //     // Récupérer toutes les données de la colonne document de la table 'embeddingsusers'
    //     $documentsUsers = Embeddingsusers::pluck('document')->toArray();

    //     // Construire le contexte avec des sections distinctes
    //     $context = "Information de l'entreprise:\n";
    //     $context .= implode("\n", $documentsUrl); // Ajouter les documents de l'entreprise
    //     $context .= "\n\nInformation de celui qui envoie le document:\n";
    //     $context .= implode("\n", $documentsUsers); // Ajouter les documents de l'utilisateur

    //     // Log du contexte pour vérifier
    //     Log::info('Context complet envoyé à Mistral', ['context' => $context]);

    //     // Lancer le job ProcessMistralAIJob avec le contexte
    //     ProcessMistralAIJob::dispatch($context);
    // }
    public function createContext()
    {
        // Récupérer toutes les données de la colonne document de la table 'embeddingsurl'
        $documentsUrl = Embeddingsurl::pluck('document')->toArray();

        // Construire le contexte avec uniquement les documents de l'entreprise
        $context = "Information de l'entreprise:\n";
        $context .= implode("\n", $documentsUrl); // Ajouter les documents de l'entreprise

        // Log du contexte pour vérifier
        Log::info('Context complet envoyé à Mistral', ['context' => $context]);

        // Lancer le job ProcessMistralAIJob avec le contexte
        ProcessMistralAIJob::dispatch($context);
    }











}
