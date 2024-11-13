<!-- delivery_delay_reclamation_letter.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Réclamation - Retard de Livraison</title>
    <link rel="stylesheet" href="{{ public_path('pdf/reclamation_letter.css') }}" media="all" />
</head>
<body>
    <div id="letter">
        <header>
            <p>{{ $user_name }}<br>{{ $user_address }}<br>{{ $user_city }}, {{ $user_zip }}</p>
            <p>{{ $company_name }}<br>{{ $company_address }}<br>{{ $company_city }}, {{ $company_zip }}</p>
        </header>

        <h1>Réclamation pour Retard de Livraison - Commande N° {{ $order_number }}</h1>

        <p>{{ $date_today }}</p>

        <p>Madame, Monsieur,</p>

        <p>
            Par la présente, je souhaite exprimer mon mécontentement quant au retard de livraison de ma commande N° {{ $order_number }}, prévue pour le {{ $expected_delivery_date }}. À ce jour, je n'ai toujours pas reçu ma commande, ce qui perturbe mes activités.
        </p>

        <p>
            Je vous demande de bien vouloir m'informer des raisons de ce retard et de me fournir une estimation de la nouvelle date de livraison. Dans l’attente de votre retour, je vous remercie de l'attention portée à cette demande.
        </p>

        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div class="signature">
            <p>{{ $user_name }}</p>
        </div>
    </div>
</body>
</html>
