<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Embeddingsusers;
use App\Jobs\ProcessResponseJob;
use App\Models\WaittoPdf;


// ceci est le job ou on envoie les donnees de l'utilisateur a l'IA

class ProcessAnotherJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $chat_model = 'open-mistral-7b';
    protected $data;
    protected $userId; // Déclarez la propriété

    /**
     * Créer une nouvelle instance du Job.
     *
     * @param mixed $data
     */
    public function __construct($data, $userId)
    {
        $this->data = $data;
        $this->userId = $userId; // Initialisez la propriété ici
    }

    /**
     * Exécuter le Job.
     *
     * @return void
     */

    public function handle()
    {
        Log::info('ProcessAnotherJob démarré', ['data' => $this->data]);

        // Décoder le JSON échappé
        $decoded_data = json_decode($this->data, true);

        // Vérifier si le JSON est valide
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error('Erreur lors du décodage JSON', [
                'json' => $this->data,
                'error' => json_last_error_msg()
            ]);
            return; // Arrêter l'exécution si le JSON est invalide
        }

        Log::info('Données décodées avec succès', ['decoded_data' => $decoded_data]);

        // Récupérer les documents de la dernière entrée pour l'utilisateur connecté
        $documents = Embeddingsusers::where('user_id', $this->userId) // Filtrer par l'utilisateur connecté
        ->orderBy('created_at', 'desc') // Trier par la date de création (les plus récents en premier)
        ->take(3)
        ->pluck('document') // Récupérer la colonne 'document'
        ->toArray(); // Convertir en tableau

        Log::info('Documents récupérés pour du users', ['documents' => $documents]);


        // Préparer le contexte pour l'IA
        $context = [
            'informations' => $decoded_data,
            'documents' => $documents,
        ];

        // Log pour vérifier les données décodées et les documents
        Log::info('Données décodées : ', ['decoded_data' => $decoded_data]);
        Log::info('Documents fournis : ', ['documents' => $documents]);

        // Créer un prompt pour l'IA
        // $system_template = <<<EOT
        // Vous allez recevoir des informations sous forme de JSON (informations). Ce JSON est incomplet, et vous devez le compléter avec des informations manquantes provenant des documents fournis (documents).

        // Votre tâche est :
        // - Compléter les champs manquants dans le JSON en recherchant les informations dans les documents.
        // - Ne retournez que le JSON complété, sans aucune phrase supplémentaire, analyse, ou commentaire.

        // Les informations manquantes peuvent concerner les coordonnées de la personne comme son nom, prénoms ou d'autres détails présents dans les documents.

        // Voici les informations JSON : {informations}.
        // Voici les documents : {documents}.
        // EOT;

        $system_template = <<<EOT
        Vous recevez un JSON contenant les informations d'un document (informations) et des documents complémentaires (documents). Votre tâche est de compléter uniquement la section `client_details` dans le JSON fourni.

        ### Détails de la tâche :
        1. Complétez tous les champs manquants dans le bloc `client_details` avec les informations pertinentes disponibles dans les documents.
        2. Si une information est absente dans les documents, insérez `"à remplir"` comme valeur par défaut.

        ### Règles :
        - Ne modifiez **que** le bloc `client_details` dans le JSON fourni.
        - Retournez uniquement le JSON complété, sans aucun texte explicatif.

        Voici les informations JSON fournies : {informations}.
        Voici les documents complémentaires : {documents}.
        EOT;




        // Log pour afficher le template du système avant remplacement
        Log::info('Template du système avant remplacement : ', ['system_template' => $system_template]);


        // Remplacement des placeholders dans le template
        $system_prompt = str_replace(
            ['{informations}', '{documents}'],
            [json_encode($context['informations'], JSON_UNESCAPED_UNICODE), json_encode($context['documents'], JSON_UNESCAPED_UNICODE)],
            $system_template
        );

        // Log pour vérifier le prompt généré après remplacement
        Log::info('Prompt généré pour l\'IA : ', ['system_prompt' => $system_prompt]);

        // Définir la question
        // $question = "Pouvez-vous compléter le JSON avec les informations manquantes provenant des documents fournis et retourner uniquement le JSON complété ?";

        $question = "Pouvez-vous compléter le JSON fourni avec les informations manquantes du prestataire de services en utilisant les documents disponibles ? Assurez-vous de ne modifier que les champs manquants dans la clé `company_details`. Retournez uniquement le JSON complété, sans aucun texte explicatif.";

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
        Log::info('Réponse de Mistral AI AnotherJob', ['result' => $result]);

        // Extraire uniquement le contenu du champ 'content'
        if (isset($result['choices']) && count($result['choices']) > 0) {
            // Extraire uniquement le contenu de la réponse (content)
            $content = $result['choices'][0]['message']['content'];

            // Log pour vérifier le contenu extrait
            Log::info('Contenu extrait de la réponse de Mistral AI', ['content' => $content]);

            // Sauvegarder le contenu extrait dans la base de données
            WaittoPdf::create([
                'finalpdfusers' => $content, // On ne stocke que le "content" ici
                'user_id' => $this->userId // Associe l'ID utilisateur
            ]);

            // Dispatcher un nouveau job avec le contenu extrait
            ProcessResponseJob::dispatch($content, $this->userId);
        } else {
            Log::warning('Aucune réponse valide retournée par Mistral AI');
        }

        // Traitez la réponse ici, si nécessaire
    }

}
