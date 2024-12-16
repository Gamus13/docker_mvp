<?php

// namespace App\Jobs;

// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Foundation\Bus\Dispatchable;
// use Illuminate\Queue\InteractsWithQueue;
// use Illuminate\Queue\SerializesModels;
// use Illuminate\Support\Facades\Http;
// use Illuminate\Support\Facades\Log;
// use App\Http\Controllers\DocumentUserController; // Importer le contrôleur
// use App\Models\InformationUser;

// class ProcessAIResponseJob implements ShouldQueue
// {
//     use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

//     protected $aiResponseContent;

//     /**
//      * Create a new job instance.
//      *
//      * @param  string  $aiResponseContent
//      * @return void
//      */
//     public function __construct(string $aiResponseContent)
//     {
//         $this->aiResponseContent = $aiResponseContent;
//     }

//     /**
//      * Execute the job.
//      *
//      * @return void
//      */
//     public function handle()
//     {
//         $content = $this->aiResponseContent;

//         $context = [
//             ['role' => 'system', 'content' => 'Vous êtes un assistant intelligent. Votre rôle est de traiter des textes existants pour extraire des informations spécifiques.'],
//             ['role' => 'user', 'content' => "Voici un texte contenant des informations sur le destinataire et l'expéditeur d'un document :\n\n$content\n\nJe souhaite que vous extrayiez uniquement les informations concernant l'expéditeur du document, sans fournir d'exemples ni de reformulations supplémentaires. Vous devez simplement me lister ces informations de manière claire, sans ajout d'exemples ou d'explications supplémentaires."]
//         ];

//         $response = Http::withHeaders([
//             'Content-Type' => 'application/json',
//             'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
//         ])->post(env('MISTRAL_API_URL'), [
//             'model' => 'mistral-small-latest',
//             'messages' => $context,
//             'temperature' => 0.7,
//             'top_p' => 1,
//             'max_tokens' => 512,
//             'stream' => false,
//             'safe_prompt' => false,
//             'random_seed' => 1337,
//         ]);

//         $responseContent = $response->json()['choices'][0]['message']['content'];

//         // Appeler la méthode statique du contrôleur pour obtenir l'embedding
//         $embedding = DocumentUserController::getQueryEmbedding($responseContent);

//         InformationUser::create([
//             'expediteur_info' => $responseContent,
//         ]);

//         Log::info('Embedding:', ['embedding' => $embedding]);
//     }
// }

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\DocumentUserController;
use App\Models\InformationUser;
use App\Models\User; // Assurez-vous d'importer le modèle User

class ProcessAIResponseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $aiResponseContent;
    protected $userId; // Stocker l'ID utilisateur pour associer l'expéditeur à un utilisateur

    /**
     * Créer une nouvelle instance du Job.
     *
     * @param  string  $aiResponseContent
     * @param  int     $userId
     * @return void
     */
    public function __construct(string $aiResponseContent, int $userId)
    {
        $this->aiResponseContent = $aiResponseContent;
        $this->userId = $userId; // Passer l'ID utilisateur
    }

    /**
     * Exécuter le Job.
     *
     * @return void
     */
    public function handle()
    {
        $content = $this->aiResponseContent;

        $context = [
            ['role' => 'system', 'content' => 'Vous êtes un assistant intelligent...'],
            ['role' => 'user', 'content' => "Voici un texte contenant des informations sur le destinataire... \n\n$content\n\nJe souhaite que vous extrayiez uniquement les informations concernant l'expéditeur."]
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
        ])->post(env('MISTRAL_API_URL'), [
            'model' => 'mistral-small-latest',
            'messages' => $context,
            'temperature' => 0.7,
            'top_p' => 1,
            'max_tokens' => 512,
            'stream' => false,
            'safe_prompt' => false,
            'random_seed' => 1337,
        ]);

        $responseContent = $response->json()['choices'][0]['message']['content'];

        // Appeler la méthode statique du contrôleur pour obtenir l'embedding
        $embedding = DocumentUserController::getQueryEmbedding($responseContent);

        // Associer les informations de l'expéditeur à un utilisateur spécifique
        InformationUser::create([
            'expediteur_info' => $responseContent,
            'user_id' => $this->userId, // Associer à un utilisateur
        ]);

        Log::info('Embedding:', ['embedding' => $embedding]);
    }
}

