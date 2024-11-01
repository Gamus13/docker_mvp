<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Validation\ValidationException;
use Google_Client;

class AuthController extends Controller {
    // register a new user method
    // public function register(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'password' => 'required|string|min:8|confirmed',
    //     ]);

    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //     ]);

    //     // Création du token avec une date d'expiration
    //     $token = $user->createToken('auth_token')->plainTextToken;
    //     $expiresAt = now()->addDays(1); // Définir l'expiration à 1 jour

    //     // En option, enregistrez la date d'expiration dans la base de données
    //     // $user->tokens()->where('id', $tokenId)->update(['expires_at' => $expiresAt]);

    //     return response()->json([
    //         'message' => 'User registered successfully',
    //         'user' => $user,
    //         'access_token' => $token,
    //         'token_type' => 'Bearer',
    //         'expires_at' => $expiresAt->toDateTimeString(), // Inclure la date d'expiration dans la réponse
    //     ], 201);
    // }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }



    // login a user method

    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required'
    //     ]);

    //     if (!Auth::attempt($request->only('email', 'password'))) {
    //         throw ValidationException::withMessages([
    //             'email' => ['The provided credentials are incorrect.'],
    //         ]);
    //     }

    //     $user = Auth::user();
    //     $token = $user->createToken('auth_token')->plainTextToken;

    //     // Définir la durée de vie du token à 1 jour (60 * 24 minutes)
    //     $expiresAt = now()->addDays(1); // Ajoute 1 jour à la date actuelle

    //     // Enregistrez la date d'expiration dans la base de données si nécessaire
    //     // $user->tokens()->where('id', $tokenId)->update(['expires_at' => $expiresAt]);

    //     return response()->json([
    //         'message' => 'User logged in successfully',
    //         'access_token' => $token,
    //         'token_type' => 'Bearer',
    //         'expires_at' => $expiresAt->toDateTimeString(), // Inclure la date d'expiration dans la réponse
    //     ]);
    // }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Vérifier si les identifiants sont corrects
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Récupérer l'utilisateur authentifié
        $user = Auth::user();

        // Créer le token avec une expiration d'un jour
        $token = $user->createToken('auth_token')->plainTextToken;
        $expiresAt = now()->addDays(1);

        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $user, // Inclure les informations de l'utilisateur
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_at' => $expiresAt->toDateTimeString(),
        ]);
    }



    // logout a user method
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'User logged out successfully'
        ]);
    }

    // get the authenticated user method
    public function user(Request $request) {
        return new UserResource($request->user());
    }
    // public function user(Request $request) {
    //     // Vérifiez si un utilisateur est authentifié
    //     if (!$request->user()) {
    //         Log::error('Aucun utilisateur authentifié.', [
    //             'session' => session()->all(),
    //             'cookies' => $request->cookies->all(),
    //         ]);

    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     // Log de l'utilisateur authentifié
    //     Log::info('Utilisateur authentifié avec succès.', [
    //         'user_id' => $request->user()->id,
    //         'user_email' => $request->user()->email,
    //         'session_data' => session()->all(),
    //         'cookies' => $request->cookies->all(),
    //     ]);

    //     // Retourner l'utilisateur sous forme de ressource
    //     return new UserResource($request->user());
    // }



    // Method to get all users
    public function getAllUsers() {
        // Retrieve all users from the database
        $users = User::all();

        // Return a JSON response with the list of users
        return response()->json([
            'users' => UserResource::collection($users),
        ]);
    }

    // Method to get the total number of users
    public function getTotalUsers() {
        // Count the total number of users in the database
        $totalUsers = User::count();

        // Return a JSON response with the total number of users
        return response()->json([
            'total_users' => $totalUsers,
        ]);
    }


    // Méthode pour mettre à jour le mot de passe de l'utilisateur
    public function updatePassword(UpdatePasswordRequest $request) {
        $user = $request->user();
        $data = $request->validated();

        if (!Hash::check($data['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Le mot de passe actuel est incorrect.'
            ], 401);
        }

        $user->update([
            'password' => Hash::make($data['new_password']),
        ]);

        return response()->json([
            'message' => 'Mot de passe mis à jour avec succès.'
        ]);
    }

    // authentification avec google login depuis reactjs et creation d'un password unique

    // public function googleLogin(Request $request)
    // {
    //     $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
    //     $payload = $client->verifyIdToken($request->token);

    //     if ($payload) {
    //         $user = User::firstOrCreate(
    //             ['email' => $payload['email']],
    //             ['name' => $payload['name'], 'email_verified_at' => now()]
    //         );

    //         $token = $user->createToken('auth_token')->plainTextToken;

    //         return response()->json([
    //             'user' => $user,
    //             'token' => $token,
    //         ]);
    //     } else {
    //         return response()->json(['error' => 'Invalid Google Token'], 401);
    //     }
    // }

    public function googleLogin(Request $request)
    {
        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($request->token);

        if ($payload) {
            $user = User::updateOrCreate(
                ['email' => $payload['email']],
                ['name' => $payload['name'], 'email_verified_at' => now(), 'password' => null] // Assurez-vous que password est null
            );

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => new UserResource($user),
                'token' => $token,
            ]);
        } else {
            return response()->json(['error' => 'Invalid Google Token'], 401);
        }
    }

    // public function handleGoogleLogin(Request $request)
    // {
    //     // Valider les données reçues
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users,email', // Vérifie si l'email est unique
    //         'googleId' => 'required|string|unique:users,google_id', // L'identifiant Google doit être unique
    //     ]);

    //     // Créer ou mettre à jour l'utilisateur
    //     try {
    //         $user = User::updateOrCreate(
    //             ['email' => $validatedData['email']], // Si l'utilisateur existe déjà avec cet email, on le met à jour
    //             [
    //                 'name' => $validatedData['name'],
    //                 'google_id' => $validatedData['googleId'],
    //                 'password' => Hash::make(uniqid()), // Générer un mot de passe aléatoire car l'utilisateur ne l'utilisera pas
    //             ]
    //         );

    //         // Connecter l'utilisateur automatiquement
    //         auth()->login($user);

    //         // Répondre avec succès
    //         return response()->json([
    //             'message' => 'User logged in successfully',
    //             'user' => $user
    //         ], 200);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'error' => 'Failed to process login',
    //             'details' => $e->getMessage(),
    //         ], 500);
    //     }
    // }
    public function handleGoogleLogin(Request $request)
    {
        // Valider les données reçues
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email', // Vérifie si l'email est unique
            'googleId' => 'required|string|unique:users,google_id', // L'identifiant Google doit être unique
        ]);

        // Créer ou mettre à jour l'utilisateur
        try {
            $user = User::updateOrCreate(
                ['email' => $validatedData['email']], // Si l'utilisateur existe déjà avec cet email, on le met à jour
                [
                    'name' => $validatedData['name'],
                    'google_id' => $validatedData['googleId'],
                    'password' => Hash::make(uniqid()), // Générer un mot de passe aléatoire car l'utilisateur ne l'utilisera pas
                ]
            );

            // Connecter automatiquement l'utilisateur
            Auth::login($user);

            // Générer un token d'authentification avec Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;

            // Optionnel: créer un cookie pour stocker le token (exemple: pour une SPA)
            $cookie = cookie('token', $token, 60 * 24); // 1 jour

            // Répondre avec succès et retourner le token
            return response()->json([
                'message' => 'User logged in successfully',
                'user' => $user,
                'token' => $token // Inclure le token dans la réponse
            ])->withCookie($cookie); // Retourner aussi le cookie si nécessaire

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to process login',
                'details' => $e->getMessage(),
            ], 500);
        }
    }


}
