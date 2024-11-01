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



    // public function show($key)
    // {
    //     // Chercher dans la table UserDocument où le champ JSON "data->objet" correspond à la clé fournie
    //     $userDocument = UserDocument::whereJsonContains('data->objet', $key)->first();

    //     // Si un document est trouvé
    //     if ($userDocument) {
    //         // Stocker le contenu JSON dans jsonaddata
    //         JsonData::create([
    //             'jsondocxusers' => json_encode($userDocument->data) // Assurez-vous que les données sont au format JSON
    //         ]);

    //         return response()->json($userDocument->data);
    //     }

    //     // Si aucun document n'est trouvé, on retourne un message d'erreur
    //     return response()->json(['message' => 'Document non trouvé'], 404);
    // }

public function show($key)
{
    Log::info('Méthode show appelée avec la clé : ' . $key); // Log la clé reçue

    // Chercher dans la table UserDocument où le champ JSON "data->objet" correspond à la clé fournie
    $userDocument = UserDocument::whereJsonContains('data->objet', $key)->first();

    // Si un document est trouvé
    if ($userDocument) {
        Log::info('Document trouvé :', ['document' => $userDocument]); // Log les données du document trouvé

        // Stocker le contenu JSON dans jsonaddata
        JsonData::create([
            'jsondocxusers' => json_encode($userDocument->data) // Assurez-vous que les données sont au format JSON
        ]);

        return response()->json($userDocument->data);
    }

    // Si aucun document n'est trouvé, on retourne un message d'erreur
    Log::warning('Aucun document trouvé pour la clé : ' . $key); // Log un avertissement si aucun document n'est trouvé
    return response()->json(['message' => 'Document non trouvé'], 404);
}




    // public function createContext(Request $request)
    // {
    //     // Récupérer toutes les données de la colonne document de la table 'embeddingsurl'
    //     $documentsUrl = Embeddingsurl::pluck('document')->toArray();

    //     // Construire le contexte avec uniquement les documents de l'entreprise
    //     $context = "Information de l'entreprise:\n";
    //     $context .= implode("\n", $documentsUrl); // Ajouter les documents de l'entreprise

    //     // Récupérer l'utilisateur connecté
    //     $user = $request->user(); // Obtenir l'utilisateur connecté via la requête
    //     $userId = $user ? $user->id : null; // Récupérer l'ID utilisateur

    //     // Log du contexte et de l'ID utilisateur pour vérifier
    //     Log::info('Contexte et user_id envoyé à Mistral', [
    //         'context' => $context,
    //         'user_id' => $userId,
    //     ]);

    //     // Lancer le job ProcessMistralAIJob avec le contexte et l'ID utilisateur
    //     ProcessMistralAIJob::dispatch($context, $userId);
    // }

    public function createContext(Request $request)
    {
        // Récupérer l'utilisateur connecté
        $user = $request->user(); // Obtenir l'utilisateur connecté via la requête
        $userId = $user ? $user->id : null; // Récupérer l'ID utilisateur

        if ($userId) {
            // Récupérer les documents du dernier enregistrement de l'utilisateur connecté
            $documentsUrl = Embeddingsurl::where('user_id', $userId)
                ->orderBy('created_at', 'desc') // Trier par la dernière entrée
                ->pluck('document') // Récupérer la colonne 'document'
                ->toArray();

            // Construire le contexte avec uniquement les documents de l'utilisateur
            $context = "Information de l'entreprise:\n";
            $context .= implode("\n", $documentsUrl); // Ajouter les documents de l'utilisateur

            // Log du contexte et de l'ID utilisateur pour vérifier
            Log::info('Contexte et user_id envoyé à Mistral', [
                'context' => $context,
                'user_id' => $userId,
            ]);

            // Lancer le job ProcessMistralAIJob avec le contexte et l'ID utilisateur
            ProcessMistralAIJob::dispatch($context, $userId);
        } else {
            // Gérer le cas où l'utilisateur n'est pas connecté ou non trouvé
            Log::warning('Utilisateur non trouvé ou non connecté');
        }
    }











}
