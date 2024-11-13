<!-- admin_error_reclamation_letter.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Réclamation - Erreur Administrative</title>
    <link rel="stylesheet" href="{{ public_path('pdf/reclamation_letter.css') }}" media="all" />
</head>
<body>
    <div id="letter">
        <header>
            <p>{{ $user_name }}<br>{{ $user_address }}<br>{{ $user_city }}, {{ $user_zip }}</p>
            <p>{{ $company_name }}<br>{{ $company_address }}<br>{{ $company_city }}, {{ $company_zip }}</p>
        </header>

        <h1>Réclamation pour Erreur Administrative</h1>

        <p>{{ $date_today }}</p>

        <p>Madame, Monsieur,</p>

        <p>
            Par la présente, je tiens à vous signaler une erreur administrative concernant {{ $issue_description }}. Cet incident a eu pour conséquence de {{ $consequence }}.
        </p>

        <p>
            Je vous demande de bien vouloir rectifier cette erreur dans les plus brefs délais et de me confirmer que les modifications nécessaires ont été effectuées. Je reste à votre disposition pour toute information complémentaire.
        </p>

        <p>Je vous remercie de votre compréhension et de l’attention portée à cette réclamation.</p>

        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div class="signature">
            <p>{{ $user_name }}</p>
        </div>
    </div>
</body>
</html>
