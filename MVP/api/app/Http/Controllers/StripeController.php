<?php

namespace App\Http\Controllers;
use Stripe\StripeClient;
use App\Models\Payment;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    //
    public function stripeSuccess(Request $request)
    {
        $stripe = new StripeClient(env('STRIPE_SECRET'));

        // Récupérer l'ID de session Stripe
        $sessionId = $request->input('session_id');

        // Récupérer la session de paiement depuis Stripe
        try {
            $session = $stripe->checkout->sessions->retrieve($sessionId);

            // Vérifier le statut du paiement
            if ($session->payment_status === 'paid') {
                // Le paiement est réussi, mettre à jour le paiement dans la base de données
                $payment = Payment::where('payment_intent_id', $session->payment_intent)->first();
                if ($payment) {
                    $payment->payment_status = 'succeeded'; // Paiement réussi
                    $payment->save();
                }

                // Vous pouvez rediriger l'utilisateur vers leur profil ou une autre page
                return redirect()->route('profile')->with('success', 'Paiement effectué avec succès.');
            } else {
                // Le paiement a échoué ou est annulé
                $payment = Payment::where('payment_intent_id', $session->payment_intent)->first();
                if ($payment) {
                    $payment->payment_status = 'failed'; // Paiement échoué
                    $payment->save();
                }

                return redirect()->route('profile')->with('error', 'Le paiement a échoué.');
            }
        } catch (\Exception $e) {
            // Si la récupération de la session échoue, retour à l'erreur
            return redirect()->route('profile')->with('error', 'Erreur lors de la vérification du paiement.');
        }
    }
}
