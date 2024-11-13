<!-- invoice_reclamation_letter.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Réclamation - Facture</title>
    <link rel="stylesheet" href="{{ public_path('pdf/reclamation_letter.css') }}" media="all" />
</head>
<body>
    <div id="letter">
        <header>
            <p>{{ $user_name }}<br>{{ $user_address }}<br>{{ $user_city }}, {{ $user_zip }}</p>
            <p>{{ $company_name }}<br>{{ $company_address }}<br>{{ $company_city }}, {{ $company_zip }}</p>
        </header>

        <h1>Réclamation concernant la Facture N° {{ $invoice_number }}</h1>

        <p>{{ $date_today }}</p>

        <p>Madame, Monsieur,</p>

        <p>
            Je me permets de vous contacter concernant la facture N° {{ $invoice_number }} reçue le {{ $invoice_date }}. Après vérification, j’ai constaté que le montant facturé diffère de celui initialement convenu dans notre accord.
        </p>

        <p>
            Le montant facturé est de {{ $incorrect_amount }} au lieu de {{ $agreed_amount }}. Je vous prie de bien vouloir vérifier cette facture et, le cas échéant, d'émettre une facture rectifiée.
        </p>

        <p>
            Dans l’attente de votre retour, je vous remercie de bien vouloir traiter cette réclamation avec diligence.
        </p>

        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div class="signature">
            <p>{{ $user_name }}</p>
        </div>
    </div>
</body>
</html>
