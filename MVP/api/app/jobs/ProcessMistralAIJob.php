<?php



namespace App\Jobs;

use App\Models\FinalDataUser;
use App\Models\JsonData;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use App\Jobs\ProcessAnotherJob;
use Illuminate\Support\Facades\Log;

class ProcessMistralAIJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $context;
    protected $chat_model = 'open-mistral-7b'; // Modèle de chat
    protected $userId; // Ajouter la propriété userId

    /**
     * Créer une nouvelle instance du Job.
     *
     * @param string $context
     * @param int $userId
     */
    public function __construct($context, $userId)
    {
        $this->context = $context;
        $this->userId = $userId; // Initialiser userId
    }

    /**
     * Exécuter le Job.
     *
     * @return void
     */
    public function handle()
    {
        // Encodage UTF-8 pour le contexte
        $context = mb_convert_encoding($this->context, 'UTF-8', 'auto');

        Log::info('Context envoyé à Mistral AI', ['context' => $context]);

        // Récupérer la valeur de jsondocxusers dans la table jsonaddata
        // $jsonData = JsonData::first(); // Récupère la première entrée
        $jsonData = JsonData::where('user_id', $this->userId)->first();

        $jsondocxusers = $jsonData ? $jsonData->jsondocxusers : null;

        // Si aucun JSON n'est trouvé dans la base de données
        if (!$jsondocxusers) {
            Log::warning('Aucun JSON trouvé dans la table jsonaddata');
            return;
        }

        // Construction du template pour l'API Mistral
        $system_template = <<<EOT
        Utilisez le JSON ci-dessous comme modèle et remplissez chaque champ avec les informations pertinentes du contexte fourni si tu ne trouves pas d'information n'invente rien, marque juste "à remplir".
        Assurez-vous que le JSON retourné soit correctement formaté, sans texte supplémentaire, qu'il soit complet et qu'il n'y ait aucun caractère d'échappement (comme \) utilisé.

        Le JSON doit être entièrement complété sans aucun texte partiel ou caractères non autorisés.

        Contexte : {context}
        JSON à remplir : {jsondocxusers}
        EOT;

        // Remplacement des placeholders dans le template
        $system_prompt = str_replace(
            ["{context}", "{jsondocxusers}"],
            [$context, $jsondocxusers],
            $system_template
        );

        // Définir la question
        $question = "Retournez uniquement le JSON complété, formaté de manière correcte, sans texte supplémentaire et sans aucun caractère d'échappement. Assurez-vous que la réponse soit complète.";

        // Appel à l'API Mistral avec des paramètres ajustés
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
        ])->post(env('MISTRAL_API_URL'), [
            'model' => $this->chat_model,
            'messages' => [
                ['role' => 'system', 'content' => $system_prompt],
                ['role' => 'user', 'content' => $question],
            ],
            'temperature' => 0.7,
            'top_p' => 1,
            'max_tokens' => 1024,
            'stream' => false,
            'safe_prompt' => false,
            'random_seed' => 1337,
        ]);

        // Vérifiez si l'API a échoué
        if ($response->failed()) {
            Log::error('Erreur lors de l\'appel à Mistral AI', [
                'status' => $response->status(),
                'body' => $response->json()
            ]);
            return;
        }

        // Récupérer la réponse
        $result = $response->json();
        Log::info('Réponse de Mistral AI', ['result' => $result]);

        // Vérifier la réponse et extraire le contenu
        if (isset($result['choices']) && count($result['choices']) > 0) {
            $final_response = $result['choices'][0]['message']['content'];

            // Valider si la réponse est bien du JSON
            $decoded_json = json_decode($final_response, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                // Convertir le tableau en JSON sans caractères d'échappement
                $final_response_clean = json_encode($decoded_json, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

                // Vérifiez si la réponse est valide
                if ($final_response_clean !== false) {
                    // Stocker la réponse dans la base de données
                    try {
                        FinalDataUser::create([
                            'finaldatausers' => $final_response_clean,
                            'user_id' => $this->userId // Utiliser la propriété userId ici
                        ]);

                        // Dispatch le nouveau job après le succès
                        ProcessAnotherJob::dispatch($final_response_clean, $this->userId); // Associer l'ID utilisateur
                        Log::info('Réponse stockée avec succès dans finaldatausers', ['response' => $final_response_clean]);
                    } catch (\Exception $e) {
                        Log::error('Échec de l\'enregistrement de la réponse dans finaldatausers', ['error' => $e->getMessage()]);
                    }
                } else {
                    Log::warning('La réponse nettoyée n\'est pas valide', ['response' => $final_response_clean]);
                }
            } else {
                Log::warning('La réponse reçue de Mistral AI n\'est pas un JSON valide', ['response' => $final_response]);
            }
        } else {
            Log::warning('Aucune réponse valide retournée par Mistral AI');
        }
    }
}


