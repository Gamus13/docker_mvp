<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    //

    public function store(Request $request)
    {
        // Valider les données de la requête
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'featured_image' => 'nullable|string|url',
            'key_points' => 'nullable|array',
            'detailed_information' => 'nullable|string',
        ]);

        // Créer un nouveau sujet avec les données validées
        $topic = Topic::create([
            'title' => $request->title,
            'description' => $request->description,
            'featured_image' => $request->featured_image,
            'key_points' => $request->key_points, // Cela sera converti en JSON
            'detailed_information' => $request->detailed_information,
        ]);

        // Retourner une réponse
        return response()->json(['message' => 'Topic created successfully!', 'data' => $topic], 201);
    }

    // app/Http/Controllers/TopicController.php
    // public function show($keyword)
    // {
    //     $topic = Topic::where('keyword', $keyword)->first();
    //     return response()->json($topic);
    // }
    public function show($keyword)
    {
        // Recherche dans le tableau JSON `key_points` pour un mot-clé correspondant
        $topic = Topic::whereJsonContains('key_points', $keyword)->first();

        if (!$topic) {
            return response()->json(['message' => 'Sujet non trouvé'], 404);
        }

        return response()->json($topic);
    }

}
