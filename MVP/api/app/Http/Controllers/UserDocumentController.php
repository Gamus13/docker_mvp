<?php

namespace App\Http\Controllers;


use App\Jobs\ProcessMistralAIJob; // Importer le job correctement
use Illuminate\Support\Facades\Http;
use App\Models\UserDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Embeddingsusers;
use App\Models\Embeddingsurl;
use App\Models\FinalDataUser;


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


    // Pour rechercher un document par un champ spécifique
    public function show($key)
    {
        // Chercher dans la table UserDocument où le champ JSON "data->objet" correspond à la clé fournie
        $userDocument = UserDocument::whereJsonContains('data->objet', $key)->first();

        // Si un document est trouvé, on retourne son contenu JSON
        if ($userDocument) {
            return response()->json($userDocument->data);
        }

        // Si aucun document n'est trouvé, on retourne un message d'erreur
        return response()->json(['message' => 'Document non trouvé'], 404);
    }


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

    //     // Appeler la méthode askQuestionStreamed avec le contexte construit
    //     $this->askQuestionStreamed($context);
    // }

    use App\Jobs\ProcessMistralAIJob;

    public function createContext()
    {
        // Récupérer toutes les données de la colonne document de la table 'embeddingsurl'
        $documentsUrl = Embeddingsurl::pluck('document')->toArray();

        // Récupérer toutes les données de la colonne document de la table 'embeddingsusers'
        $documentsUsers = Embeddingsusers::pluck('document')->toArray();

        // Construire le contexte avec des sections distinctes
        $context = "Information de l'entreprise:\n";
        $context .= implode("\n", $documentsUrl); // Ajouter les documents de l'entreprise
        $context .= "\n\nInformation de celui qui envoie le document:\n";
        $context .= implode("\n", $documentsUsers); // Ajouter les documents de l'utilisateur

        // Log du contexte pour vérifier
        Log::info('Context complet envoyé à Mistral', ['context' => $context]);

        // Lancer le job ProcessMistralAIJob avec le contexte
        ProcessMistralAIJob::dispatch($context);
    }



    // public function askQuestionStreamed($documentsUsers, $documentsUrl)
    // {
    //     // Encodage en UTF-8
    //     $documentsUsers = mb_convert_encoding($documentsUsers, 'UTF-8', 'auto');
    //     $documentsUrl = mb_convert_encoding($documentsUrl, 'UTF-8', 'auto');

    //     Log::info('Context sent to Mistral AI', ['context' => $documentsUsers]);
    //     Log::info('Context sent to Mistral ', ['context' => $documentsUrl]);

    //     // Template du système
    //     $system_template = <<<EOT
    //     Utilisez les informations suivantes pour répondre à la question de l'utilisateur.
    //     Si vous ne connaissez pas la réponse, dites simplement que vous ne savez pas, ne cherchez pas à inventer une réponse.
    //     ----------------
    //     {context}
    //     EOT;

    //     // Remplacer le contexte dans le template
    //     $system_prompt = str_replace("{context}", $context, $system_template);

    //     // Appel de l'API Mistral
    //     $response = Http::withHeaders([
    //         'Content-Type' => 'application/json',
    //         'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
    //     ])->post(env('MISTRAL_API_URL'), [
    //         'model' => $this->chat_model,  // Utilisation du modèle chat
    //         'messages' => [
    //             ['role' => 'system', 'content' => $system_prompt],
    //             ['role' => 'user', 'content' => $question],
    //         ],
    //         'temperature' => 0.7,
    //         'top_p' => 1,
    //         'max_tokens' => 512,
    //         'stream' => false,
    //         'safe_prompt' => false,
    //         'random_seed' => 1337,
    //     ]);

    //     $result = $response->json();

    //     Log::info('Response from Mistral AI', ['result' => $result]);

    //     // Vérifier et extraire la réponse
    //     if (isset($result['choices']) && count($result['choices']) > 0) {
    //         $final_response = $result['choices'][0]['message']['content'];

    //         // Stocker la réponse dans la table finaldatausers
    //         try {
    //             FinalDataUser::create([
    //                 'finaldatausers' => $final_response
    //             ]);

    //             Log::info('Response successfully stored in finaldatausers', ['response' => $final_response]);
    //         } catch (\Exception $e) {
    //             Log::error('Failed to store response in finaldatausers', ['error' => $e->getMessage()]);
    //         }

    //         // Retourner la réponse à l'utilisateur
    //         return $final_response;
    //     } else {
    //         Log::warning('No valid response returned from Mistral AI');
    //         return ''; // Gérer le cas où aucune réponse valide n'est retournée
    //     }
    // }
    public function askQuestionStreamed($context)
    {
        // Encodage UTF-8 pour chaque document dans le contexte (au cas où des caractères spéciaux seraient présents)
        $context = mb_convert_encoding($context, 'UTF-8', 'auto');

        Log::info('Context envoyé à Mistral AI', ['context' => $context]);

        // Construction du template système pour Mistral AI
        $system_template = <<<EOT
        Utilisez les informations suivantes pour extraire les données pertinentes qui serviront à générer un document.
        Analysez les informations et renvoyez uniquement les éléments essentiels pour le document final.
        Si une information ne semble pas pertinente, ignorez-la.
        ----------------
        {context}
        EOT;

        // Remplacer le placeholder {context} dans le template par le contenu du contexte
        $system_prompt = str_replace("{context}", $context, $system_template);

        // Question posée à Mistral (ici, il s'agit de l'objectif demandé à Mistral AI)
        $question = "Quels éléments du contexte fourni sont pertinents pour générer un document clair et concis?";

        // Appel de l'API Mistral avec le système et la question utilisateur
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
        ])->post(env('MISTRAL_API_URL'), [
            'model' => $this->chat_model,  // Utilisation du modèle Mistral AI pour chat
            'messages' => [
                ['role' => 'system', 'content' => $system_prompt],
                ['role' => 'user', 'content' => $question],
            ],
            'temperature' => 0.7,
            'top_p' => 1,
            'max_tokens' => 512,
            'stream' => false,
            'safe_prompt' => false,
            'random_seed' => 1337,
        ]);

        // Extraction de la réponse JSON
        $result = $response->json();

        Log::info('Réponse de Mistral AI', ['result' => $result]);

        // Vérifier et extraire la réponse de l'API
        if (isset($result['choices']) && count($result['choices']) > 0) {
            $final_response = $result['choices'][0]['message']['content'];

            // Stocker la réponse dans la table finaldatausers
            try {
                FinalDataUser::create([
                    'finaldatausers' => $final_response
                ]);

                Log::info('Réponse stockée avec succès dans finaldatausers', ['response' => $final_response]);
            } catch (\Exception $e) {
                Log::error('Échec de l\'enregistrement de la réponse dans finaldatausers', ['error' => $e->getMessage()]);
            }

            // Retourner la réponse finale extraite par Mistral AI
            return $final_response;
        } else {
            Log::warning('Aucune réponse valide retournée par Mistral AI');
            return ''; // Gestion du cas où aucune réponse n'est retournée
        }
    }








}
