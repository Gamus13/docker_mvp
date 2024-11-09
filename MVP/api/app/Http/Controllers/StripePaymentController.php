<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;
use Stripe\StripeClient;
use Illuminate\Support\Facades\Auth;

class StripePaymentController extends Controller
{
    //

    public function stripeCheckout(Request $request)
    {
        $stripe = new StripeClient(env('STRIPE_SECRET'));
        $user = Auth::user();
        $redirectUrl = route('stripe.checkout.success') . '?session_id={CHECKOUT_SESSION_ID}';

        $response = $stripe->checkout->sessions->create([
            'success_url' => $redirectUrl,
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

        return response()->json(['url' => $response['url']]);
    }


    public function stripeCheckoutSuccess(Request $request)
    {
        $stripe = new StripeClient(env('STRIPE_SECRET'));

        // Récupérer la session de paiement
        $session = $stripe->checkout->sessions->retrieve($request->session_id);

        return response()->json([
            'message' => 'Subscription active',
            'redirect_url' => url('localhost:3000/checkout/success') // URL de la route de succès dans votre application React
        ]);
    }
}
