<?php

namespace App\Http\Controllers;

use App\Models\UserDocument;
use Illuminate\Http\Request;

class UserDocumentController extends Controller
{
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


}
