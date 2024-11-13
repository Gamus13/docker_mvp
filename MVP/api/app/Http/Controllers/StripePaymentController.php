<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;
use Stripe\StripeClient;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Stripe\Checkout\Session;
use Illuminate\Http\JsonResponse;
use App\Models\Payment;
use App\Models\PaymentSession;
use Illuminate\Support\Facades\Log; // N'oubliez pas d'ajouter cette importation

class StripePaymentController extends Controller
{
    //


    public function stripeCheckout(Request $request)
    {
        $stripe = new StripeClient(env('STRIPE_SECRET'));
        $user = Auth::user(); // Récupérer l'utilisateur connecté

        // Utiliser l'URL directe du frontend
        $redirectUrl = 'http://localhost/app/profile/status_pricing';

        // Créer la session de paiement Stripe
        $response = $stripe->checkout->sessions->create([
            'success_url' => $redirectUrl, // Redirige directement vers le frontend
            'cancel_url' => 'http://localhost:3000/checkout/cancel', // Optionnel: définir une URL d'annulation
            'customer_email' => $user->email,
            'payment_method_types' => ['link', 'card'],
            'line_items' => [
                [
                    'price_data' => [
                        'product_data' => [
                            'name' => $request->product,
                        ],
                        'unit_amount' => 100 * $request->price,
                        'currency' => 'USD',
                    ],
                    'quantity' => 1
                ],
            ],
            'mode' => 'payment',
            'allow_promotion_codes' => true,
        ]);

        // Enregistrer le paiement dans la base de données
        $payment = Payment::create([
            'user_id' => $user->id,  // Lier le paiement à l'utilisateur
            'payment_intent_id' => $response->payment_intent, // Si disponible
            'payment_status' => 'pending',  // Statut en attente
            'amount' => $request->price,
            'currency' => 'USD',
        ]);

        // Retourner l'URL de la session Stripe
        return response()->json(['url' => $response['url']]);
    }

    // public function stripeCheckout(Request $request)
    // {
    //     $stripe = new StripeClient(env('STRIPE_SECRET'));
    //     $user = Auth::user(); // Récupérer l'utilisateur connecté

    //     // Créer la session de paiement Stripe
    //     $response = $stripe->checkout->sessions->create([
    //         'success_url' => route('stripe.success', ['session_id' => '{CHECKOUT_SESSION_ID}']), // Redirection avec l'ID de la session
    //         'cancel_url' => 'http://localhost:3000/checkout/cancel', // Optionnel: définir une URL d'annulation
    //         'customer_email' => $user->email,
    //         'payment_method_types' => ['link', 'card'],
    //         'line_items' => [
    //             [
    //                 'price_data' => [
    //                     'product_data' => [
    //                         'name' => $request->product,
    //                     ],
    //                     'unit_amount' => 100 * $request->price,
    //                     'currency' => 'USD',
    //                 ],
    //                 'quantity' => 1
    //             ],
    //         ],
    //         'mode' => 'payment',
    //         'allow_promotion_codes' => true,
    //     ]);

    //     // Enregistrer le paiement dans la base de données
    //     $payment = Payment::create([
    //         'user_id' => $user->id,  // Lier le paiement à l'utilisateur
    //         'payment_intent_id' => $response->payment_intent, // Si disponible
    //         'payment_status' => 'pending',  // Statut en attente
    //         'amount' => $request->price,
    //         'currency' => 'USD',
    //     ]);

    //     // Retourner l'URL de la session Stripe
    //     return response()->json(['url' => $response['url']]);
    // }


    // public function stripeCheckout(Request $request)
    // {
    //     $stripe = new StripeClient(env('STRIPE_SECRET'));
    //     $user = Auth::user();

    //     // Créer la session de paiement Stripe
    //     $response = $stripe->checkout->sessions->create([
    //         'success_url' => 'http://localhost/app/profile', // Redirige vers votre frontend
    //         'cancel_url' => 'http://localhost:3000/checkout/cancel', // URL d'annulation
    //         'customer_email' => $user->email,
    //         'payment_method_types' => ['link', 'card'],
    //         'line_items' => [
    //             [
    //                 'price_data' => [
    //                     'product_data' => [
    //                         'name' => $request->product,
    //                     ],
    //                     'unit_amount' => 100 * $request->price, // Prix en cents
    //                     'currency' => 'USD',
    //                 ],
    //                 'quantity' => 1
    //             ],
    //         ],
    //         'mode' => 'payment',
    //         'allow_promotion_codes' => true,
    //     ]);

    //     // Enregistrer les informations de paiement dans la base de données
    //     $payment = Payment::create([
    //         'user_id' => $user->id,
    //         'payment_intent_id' => $response->payment_intent,
    //         'payment_status' => 'pending', // En attente jusqu'à ce que Stripe nous confirme le paiement
    //         'amount' => $request->price,
    //         'currency' => 'USD',
    //     ]);

    //     // Enregistrer la session de paiement
    //     PaymentSession::create([
    //         'payment_id' => $payment->id,
    //         'stripe_session_id' => $response->id,
    //         'session_url' => $response->url,
    //     ]);

    //     return response()->json(['url' => $response->url]);
    // }

    // public function stripeCheckout(Request $request)
    // {
    //     $stripe = new StripeClient(env('STRIPE_SECRET'));
    //     $user = Auth::user();

    //     // Créer la session de paiement Stripe
    //     $response = $stripe->checkout->sessions->create([
    //         'success_url' => 'http://localhost/app/profile', // Redirige vers votre frontend
    //         'cancel_url' => 'http://localhost:3000/checkout/cancel', // URL d'annulation
    //         'customer_email' => $user->email,
    //         'payment_method_types' => ['link', 'card'],
    //         'line_items' => [
    //             [
    //                 'price_data' => [
    //                     'product_data' => [
    //                         'name' => $request->product,
    //                     ],
    //                     'unit_amount' => 100 * $request->price, // Prix en cents
    //                     'currency' => 'USD',
    //                 ],
    //                 'quantity' => 1
    //             ],
    //         ],
    //         'mode' => 'payment',
    //         'allow_promotion_codes' => true,
    //     ]);

    //     // Loguer la réponse de Stripe
    //     Log::info('Stripe Response:', ['response' => $response]);

    //     // Vérifiez si le payment_intent existe dans la réponse
    //     $paymentIntentId = $response->payment_intent;

    //     // Si le payment_intent est nul, gérer l'erreur ou essayer une autre approche
    //     if (!$paymentIntentId) {
    //         Log::error('Payment intent is null.', ['response' => $response]);
    //         return response()->json(['error' => 'Payment intent not generated.'], 500);
    //     }

    //     // Enregistrer les informations de paiement dans la base de données
    //     $payment = Payment::create([
    //         'user_id' => $user->id,
    //         'payment_intent_id' => $paymentIntentId, // Utilisation de payment_intent_id récupéré
    //         'payment_status' => 'pending', // En attente jusqu'à ce que Stripe nous confirme le paiement
    //         'amount' => $request->price,
    //         'currency' => 'USD',
    //     ]);

    //     // Enregistrer la session de paiement
    //     PaymentSession::create([
    //         'payment_id' => $payment->id,
    //         'stripe_session_id' => $response->id,
    //         'session_url' => $response->url,
    //     ]);

    //     return response()->json(['url' => $response->url]);
    // }

    public function checkPaymentStatus()
    {
        // Initialiser le client Stripe
        $stripe = new StripeClient(env('STRIPE_SECRET'));

        // Récupérer l'utilisateur connecté
        $user = Auth::user();

        // Récupérer le dernier paiement "pending" de cet utilisateur
        $payment = Payment::where('user_id', $user->id)
                          ->where('payment_status', 'pending')
                          ->latest()
                          ->first();

        // Si aucun paiement n'est trouvé, renvoyer un statut non trouvé
        if (!$payment) {
            return response()->json(['status' => 'no_payment_found']);
        }

        try {
            // Récupérer la session Stripe pour vérifier le statut
            $session = $stripe->checkout->sessions->retrieve($payment->session_id);

            // Vérifier si le paiement a été complété
            if ($session->payment_status === 'paid') {
                // Mettre à jour le statut du paiement en "succeeded" dans la base de données
                $payment->update(['payment_status' => 'succeeded']);
                return response()->json(['status' => 'succeeded']);
            }

            return response()->json(['status' => 'pending']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }


}
