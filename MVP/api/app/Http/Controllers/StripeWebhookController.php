<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Webhook;
use App\Models\Payment;


class StripeWebhookController extends Controller
{
    //

    public function handleWebhook(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // Vérifier la signature du webhook (optionnel mais recommandé)
        $signature = $request->header('Stripe-Signature');
        $webhookSecret = env('STRIPE_WEBHOOK_SECRET'); // Clé secrète du webhook obtenue sur Stripe
        $payload = $request->getContent();

        try {
            $event = Webhook::constructEvent($payload, $signature, $webhookSecret);
        } catch (\UnexpectedValueException $e) {
            // Payload invalide
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Signature invalide
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        // Gérer différents types d'événements
        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            // Rechercher le paiement dans la base de données et mettre à jour le statut
            $payment = Payment::where('payment_intent_id', $session->payment_intent)->first();

            if ($payment) {
                $payment->update(['payment_status' => 'succeeded']);
            }
        }

        return response()->json(['status' => 'success'], 200);
    }
}
