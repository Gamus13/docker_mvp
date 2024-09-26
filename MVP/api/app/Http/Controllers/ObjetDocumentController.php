<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Jobs\ProcessAIResponseJob;
use App\Http\Repository\DocumentUserRepository; // Utilisez DocumentUserRepository
use App\Models\ObjetDocument;
use App\Http\Controllers\DocumentUserController;


class ObjetDocumentController extends Controller
{
    protected $chat_model = 'mistral-small-latest'; // Assurez-vous de définir votre modèle ici
    protected $documentUserRepository;

    /**
     * Crée une nouvelle instance du contrôleur.
     *
     * @param  DocumentUserRepository  $documentUserRepository
     * @return void
     */
    public function __construct(DocumentUserRepository $documentUserRepository)
    {
        $this->documentUserRepository = $documentUserRepository;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'document_type' => 'required|string',
        ]);

        $context = $this->createDynamicContext($validatedData['document_type']);
        $response = $this->askQuestion($context);
        $ai_response_content = $response['choices'][0]['message']['content'];

        $objetDocument = ObjetDocument::create([
            'document_type' => $validatedData['document_type'],
            'ai_response' => $ai_response_content,
        ]);

        ProcessAIResponseJob::dispatch($ai_response_content, $this->documentUserRepository);

        return redirect()->route('documents.show', ['key' => $validatedData['document_type']])
        ->with('success', 'Document saved successfully')
        ->with('document', $objetDocument);

    }



    /**
     * Crée un contexte dynamique basé uniquement sur le type de document.
     *
     * @param  string  $documentType
     * @return array
     */
    protected function createDynamicContext(string $documentType): array
    {
        // Créer un contexte de base avec des instructions détaillées
        $context = [
            ['role' => 'system', 'content' => 'Vous êtes un assistant intelligent pour la génération de documents.'],
            ['role' => 'user', 'content' => "Je veux créer un document de type: $documentType. Pour ce document, pourriez-vous fournir les éléments suivants :"],
            ['role' => 'user', 'content' => "1. Les informations nécessaires à inclure pour le destinataire du document."],
            ['role' => 'user', 'content' => "2. Les informations nécessaires à inclure pour l'expéditeur du document."],
            ['role' => 'user', 'content' => "Merci de détailler les éléments essentiels que l'on doit inclure dans chaque partie pour rendre le document complet et professionnel."]
        ];

        // Ajouter des instructions spécifiques si nécessaire
        if (stripos($documentType, 'en allemand') !== false) {
            $context[] = ['role' => 'system', 'content' => 'L\'utilisateur souhaite que le document soit en allemand.'];
        }

        return $context;
    }

    /**
     * Pose une question à l'IA en utilisant un contexte donné.
     *
     * @param  array  $messages
     * @return array
     */
    public function askQuestion(array $messages)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . env('MISTRAL_SECRET'),
        ])->post(env('MISTRAL_API_URL'), [
            'model' => $this->chat_model,
            'messages' => $messages,
            'temperature' => 0.7,
            'top_p' => 1,
            'max_tokens' => 512,
            'stream' => false,
            'safe_prompt' => false,
            'random_seed' => 1337,
        ]);

        return $response->json();
    }
}
