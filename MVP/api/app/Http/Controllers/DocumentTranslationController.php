<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;


class DocumentTranslationController extends Controller
{
    //

    public function translateDocument(Request $request)
    {
        // Validation des entrées
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg,tiff,bmp,html,xml',
            'language' => 'required|string|size:2',  // ISO 639-1 format, ex: 'fr' for French
        ]);

        // Récupération du fichier et le sauvegarder temporairement
        $file = $request->file('file');
        $filePath = $file->storeAs('temp', $file->getClientOriginalName());

        // Préparer les données pour l'appel API
        $client = new Client();
        $token = env('APY_API_TOKEN'); // Ton token API

        try {
            $response = $client->post('https://api.apyhub.com/translate/file', [
                'headers' => [
                    'apy-token' => $token,
                    'Content-Type' => 'multipart/form-data'
                ],
                'multipart' => [
                    [
                        'name' => 'file',
                        'contents' => fopen(storage_path('app/' . $filePath), 'r'),
                        'filename' => $file->getClientOriginalName(),
                    ],
                    [
                        'name' => 'language',
                        'contents' => $request->input('language'),
                    ],
                    [
                        'name' => 'translitération',
                        'contents' => 'false', // Ou 'true' si besoin
                    ]
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            // Supprimer le fichier temporaire
            Storage::delete($filePath);

            // Retourner la réponse JSON à ReactJS
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
