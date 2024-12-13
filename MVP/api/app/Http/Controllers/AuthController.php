<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
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

    //     return response()->json([
    //         'message' => 'User registered successfully',
    //         'user' => $user
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

        // Connecter l'utilisateur après l'inscription
        Auth::login($user);

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

    // public function login(Request $request)
    // {
    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required'
    //     ]);

    //     // Vérifier si les identifiants sont corrects
    //     if (!Auth::attempt($request->only('email', 'password'))) {
    //         throw ValidationException::withMessages([
    //             'email' => ['The provided credentials are incorrect.'],
    //         ]);
    //     }

    //     // Récupérer l'utilisateur authentifié
    //     $user = Auth::user();

    //     // Créer le token avec une expiration d'un jour
    //     $token = $user->createToken('auth_token')->plainTextToken;
    //     $expiresAt = now()->addDays(1);

    //     return response()->json([
    //         'message' => 'User logged in successfully',
    //         'user' => $user, // Inclure les informations de l'utilisateur
    //         'access_token' => $token,
    //         'token_type' => 'Bearer',
    //         'expires_at' => $expiresAt->toDateTimeString(),
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

        // Mettre à jour les informations utilisateur
        $user->increment('visit_count'); // Incrémenter le compteur de visites
        $user->last_login_at = now(); // Mettre à jour la dernière connexion
        $user->save();

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

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */

    public function handleGoogleCallback()
    {
        try {

            $user = Socialite::driver('google')->user();
            $finduser = User::where('google_id', $user->id)->first();

            if($finduser){

                Auth::login($finduser);
                return redirect()->intended('home');

            }else{
                $newUser = User::updateOrCreate(['email' => $user->email],[
                        'name' => $user->name,
                        'google_id'=> $user->id,
                        'password' => encrypt('123456dummy')
                    ]);

                Auth::login($newUser);

                return redirect()->intended('home');
            }

        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }

    // methode pour recuperer les dernieres visites des utilisateurs et leur nombre
    public function getUserGreeting()
    {
        $user = Auth::user();

        // Récupération des informations utilisateur
        $lastVisit = $user->last_login_at; // Supposez que vous avez une colonne `last_login_at`
        $lastDocument = $user->last_document_type; // Supposez que vous avez une colonne `last_created_document`
        $visitCount = $user->visit_count; // Supposez que vous avez une colonne `visit_count`

        return response()->json([
            'name' => $user->name,
            'last_visit' => $lastVisit,
            'last_document' => $lastDocument,
            'visit_count' => $visitCount,
        ]);
    }


    public function getAllUserGreetings()
    {
        // Récupérer tous les utilisateurs avec leurs derniers documents
        $users = \App\Models\User::with('documents') // Supposez que la relation avec les documents est définie
            ->get()
            ->map(function ($user) {
                // Obtenir le dernier document créé par l'utilisateur
                $lastDocument = $user->documents->last();

                return [
                    'name' => $user->name,
                    'last_visit' => $user->last_login_at,
                    'last_document' => $lastDocument ? $lastDocument->document_type : null,
                    'visit_count' => $user->visit_count,
                ];
            });

        return response()->json($users);
    }



}
