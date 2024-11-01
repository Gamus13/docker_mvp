<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pdf; // Assurez-vous que le modèle Pdf est importé

class UserPdfGenerateController extends Controller
{
    //

    // public function upload(Request $request)
    // {
    //     // Valider la requête
    //     $request->validate([
    //         'file' => 'required|mimes:pdf|max:2048', // Maximum de 2 Mo pour le PDF
    //     ]);

    //     // Gérer le téléchargement du fichier
    //     if ($request->file('file')) {
    //         $file = $request->file('file');
    //         $filename = time() . '_' . $file->getClientOriginalName(); // Créer un nom de fichier unique
    //         $path = $file->storeAs('pdfs', $filename, 'public'); // Stocker le fichier dans le dossier public/pdfs

    //         // Enregistrer les informations dans la base de données
    //         Pdf::create([
    //             'filename' => $filename,
    //             'path' => $path,
    //         ]);

    //         return response()->json(['message' => 'Fichier téléchargé avec succès', 'path' => $path], 201);
    //     }

    //     return response()->json(['message' => 'Erreur lors du téléchargement du fichier'], 500);
    // }

    public function upload(Request $request)
    {
        // Valider la requête
        $request->validate([
            'file' => 'required|mimes:pdf|max:2048', // Maximum de 2 Mo pour le PDF
        ]);

        // Gérer le téléchargement du fichier
        if ($request->file('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName(); // Créer un nom de fichier unique

            // Stocker le fichier dans le dossier public/uploaded_pdfs
            $path = $file->storeAs('uploaded_pdfs', $filename, 'public');

            // Enregistrer les informations dans la base de données
            Pdf::create([
                'filename' => $filename,
                'path' => $path,
            ]);

            return response()->json(['message' => 'Fichier téléchargé avec succès', 'path' => $path], 201);
        }

        return response()->json(['message' => 'Erreur lors du téléchargement du fichier'], 500);
    }

    // Méthode pour récupérer tous les documents PDF
    public function index()
    {
        // Récupérer tous les documents de la base de données
        $pdfs = Pdf::all();

        // Retourner une réponse JSON avec les documents
        return response()->json($pdfs);
    }

}
