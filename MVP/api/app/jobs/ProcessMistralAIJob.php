<?php

namespace App\Jobs;

use App\Models\FinalDataUser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProcessMistralAIJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $context;

    /**
     * Créer une nouvelle instance du Job.
     *
     * @param string $context
     */
    public function __construct($context)
    {
        $this->context = $context;
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

        // Construction du template pour l'API Mistral
        $system_template = <<<EOT
        Utilisez les informations suivantes pour extraire les données pertinentes qui serviront à générer un document.
        Analysez les informations et renvoyez uniquement les éléments essentiels pour le document final.
        Si une information ne semble pas pertinente, ignorez-la.
        ----------------
        {context}
        EOT;

        // Remplacement du placeholder dans le template
        $system_prompt = str_replace("{context}", $context, $system_template);

        // Définir la question
        $question = "Quels éléments du contexte fourni sont pertinents pour générer un document clair et concis?";

        // Appel à l'API Mistral
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
        ])->post(env('MISTRAL_API_URL'), [
            'model' => 'mistral-ai-chat-model',  // Utilise ton modèle spécifique
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

        // Récupérer la réponse
        $result = $response->json();

        Log::info('Réponse de Mistral AI', ['result' => $result]);

        // Vérifier la réponse et extraire le contenu
        if (isset($result['choices']) && count($result['choices']) > 0) {
            $final_response = $result['choices'][0]['message']['content'];

            // Stocker la réponse dans la base de données
            try {
                FinalDataUser::create([
                    'finaldatausers' => $final_response
                ]);

                Log::info('Réponse stockée avec succès dans finaldatausers', ['response' => $final_response]);
            } catch (\Exception $e) {
                Log::error('Échec de l\'enregistrement de la réponse dans finaldatausers', ['error' => $e->getMessage()]);
            }
        } else {
            Log::warning('Aucune réponse valide retournée par Mistral AI');
        }
    }
}
