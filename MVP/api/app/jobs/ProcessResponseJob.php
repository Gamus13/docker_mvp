<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\FinalPdfUser;
use App\Models\WaitToPdf; // Modèle pour la table waitto_pdf

class ProcessResponseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $response;

    /**
     * Créer une nouvelle instance du Job.
     *
     * @param mixed $response
     */
    public function __construct($response)
    {
        $this->response = $response;
        Log::info('ProcessResponseJob instancié', ['response' => $this->response]);
    }

    /**
     * Exécuter le Job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info('ProcessResponseJob démarré', ['response' => $this->response]);

        // Récupérer les dernières données de la colonne 'finalpdfusers' de la table 'waitto_pdf'
        $lastFinalPdf = WaitToPdf::latest()->first();

        if ($lastFinalPdf) {
            $response = $lastFinalPdf->finalpdfusers;  // Utiliser le contenu de 'finalpdfusers'
            Log::info('Dernier enregistrement récupéré de waitto_pdf', ['finalpdfusers' => $response]);
        } else {
            Log::warning('Aucun enregistrement trouvé dans la table waitto_pdf.');
            return;  // Sortir si aucun enregistrement n'a été trouvé
        }

        // Template du système
        $system_template = <<<EOT
        Vous allez recevoir un JSON. Votre tâche est de corriger ce JSON pour qu'il devienne un JSON valide.
        Répondez uniquement avec le JSON corrigé, sans aucune explication, phrase d'introduction ou commentaire supplémentaire.
        Voici le JSON :
        ----------------
        {response}
        EOT;

        // Remplacer la réponse dans le template
        $system_prompt = str_replace("{response}", $response, $system_template);

        // Appel de l'API Mistral
        $apiResponse = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
        ])->post(env('MISTRAL_API_URL'), [
            'model' => 'mistral-large-latest',
            'messages' => [
                ['role' => 'system', 'content' => $system_prompt],
            ],
            'temperature' => 0.7,
            'top_p' => 1,
            'max_tokens' => 700,
            'stream' => false,
            'safe_prompt' => false,
            'random_seed' => 1337,
            'response_format' => ['type' => 'json_object'] // Forcer la réponse en format JSON
        ]);

        $result = $apiResponse->json();

        Log::info('Response from Mistral AI', ['result' => $result]);

        if (isset($result['choices']) && count($result['choices']) > 0) {
            // Extraire uniquement le contenu de la réponse (content)
            $content = $result['choices'][0]['message']['content'];

            // Log pour vérifier le contenu extrait
            Log::info('Contenu extrait de la réponse de Mistral AI 13', ['content' => $content]);

            // Sauvegarder le contenu extrait dans la base de données
            FinalPdfUser::create([
                'finalpdf' => $content // On ne stocke que le "content" ici
            ]);


        } else {
            Log::warning('Aucune réponse valide retournée par Mistral AI');
        }

    }
}
