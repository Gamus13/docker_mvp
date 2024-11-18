<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Pour obtenir la liste de tous les posts.

    public function index()
    {
        // Utiliser 'user' au lieu de 'author'
        $posts = Post::with('tags', 'user')->get();
        return response()->json($posts);
    }

    // Pour obtenir les détails d'un post spécifique par son ID.

    public function show($id)
    {
        // Utiliser 'user' au lieu de 'author'
        $post = Post::with('tags', 'user')->findOrFail($id);
        return response()->json($post);
    }

    public function getTags()
    {
        $tags = Tag::all();
        return response()->json($tags);
    }


    public function create()
    {
        $tags = Tag::all();
        return view('posts.create', compact('tags'));
    }


    // public function store(Request $request)
    // {
    //     $user = auth()->user();

    //     // Vérifie si l'utilisateur est un admin
    //     if (!$user || $user->role !== 'admin') {
    //         return response()->json(['message' => 'Unauthorized'], 403);
    //     }

    //     $validated = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'content' => 'required|string',
    //         'image' => 'nullable|image',
    //         'tags' => 'nullable|array'
    //     ]);

    //     $imagePath = $request->hasFile('image') ? $request->file('image')->move(public_path('images'), $request->file('image')->getClientOriginalName()) : null;

    //     $post = Post::create([
    //         'title' => $validated['title'],
    //         'content' => $validated['content'],
    //         'image' => $imagePath ? 'images/' . $request->file('image')->getClientOriginalName() : null,
    //         'user_id' => $user->id,
    //     ]);

    //     if (isset($validated['tags'])) {
    //         $post->tags()->sync($validated['tags']);
    //     }

    //     return response()->json(['message' => 'Post created successfully.', 'post' => $post], 201);
    // }

    public function store(Request $request)
    {
        $user = auth()->user();

        // Vérifie si l'utilisateur est un admin
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'image' => 'nullable|image',
            'tags' => 'nullable|array'
        ]);

        $imagePath = $request->hasFile('image') ? $request->file('image')->move(public_path('images'), $request->file('image')->getClientOriginalName()) : null;

        $post = Post::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'description' => $validated['description'] ?? null,
            'category' => $validated['category'] ?? null,
            'image' => $imagePath ? 'images/' . $request->file('image')->getClientOriginalName() : null,
            'user_id' => $user->id,
        ]);

        if (isset($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        return response()->json(['message' => 'Post created successfully.', 'post' => $post], 201);
    }




}
