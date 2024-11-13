<!-- quality_reclamation_letter.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Réclamation - Qualité du Produit/Service</title>
    <link rel="stylesheet" href="{{ public_path('pdf/reclamation_letter.css') }}" media="all" />
</head>
<body>
    <div id="letter">
        <header>
            <p>{{ $user_name }}<br>{{ $user_address }}<br>{{ $user_city }}, {{ $user_zip }}</p>
            <p>{{ $company_name }}<br>{{ $company_address }}<br>{{ $company_city }}, {{ $company_zip }}</p>
        </header>

        <h1>Réclamation pour Qualité du Produit/Service - Commande N° {{ $order_number }}</h1>

        <p>{{ $date_today }}</p>

        <p>Madame, Monsieur,</p>

        <p>
            Je vous contacte au sujet de la qualité de {{ $product_or_service_name }} reçu dans ma commande N° {{ $order_number }}. Malheureusement, ce produit/service ne répond pas aux attentes que j'avais, et présente des défauts/problèmes suivants : {{ $issues_description }}.
        </p>

        <p>
            Je vous prie de bien vouloir me proposer une solution adaptée (remplacement, réparation ou remboursement) pour remédier à ce problème. Je vous remercie pour l’attention portée à cette réclamation.
        </p>

        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div class="signature">
            <p>{{ $user_name }}</p>
        </div>
    </div>
</body>
</html>
