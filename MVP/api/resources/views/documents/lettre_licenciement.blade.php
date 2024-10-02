<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Licenciement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .header, .footer {
            margin-bottom: 20px;
        }
        .signature {
            margin-top: 50px;
        }
        .jobs{
            text-align: right;
        }
        .day{
            margin-top: -15px;
        }
    </style>
</head>
<body>
    <!-- Coordonnées de l'entreprise -->
    <div class="header">
        <strong>{{ $coordonnees_employeur['nom_entreprise'] }}</strong><br>
        {{ $coordonnees_employeur['adresse_entreprise'] }}<br>
        {{ $coordonnees_employeur['code_postal_entreprise'] }}<br>
        {{ $coordonnees_employeur['ville_entreprise'] }}<br>
    </div>

    <!-- Date -->
    <div class="day">
        <p>{{ $date }}</p>
    </div>

    <!-- Coordonnées de l'employé -->
    <div class="jobs">
        <p>
            <strong>{{ $coordonnees_employe['nom'] }}</strong><br>
            {{ $coordonnees_employe['adresse'] }}<br>
            {{ $coordonnees_employe['code_postal'] }}<br>
            {{ $coordonnees_employe['ville'] }}<br>
        </p>
    </div>

    <!-- Objet de la lettre -->
    <div>
        <p><strong>Objet : {{ $objet }}</strong></p>
    </div>

    <!-- Formule d'appel -->
    <div>
        <p>{{ $formule_appel }}</p>
    </div>

    <!-- Corps de la lettre -->
    <div>
        <p>{{ $corps_lettre['introduction'] }}</p>
        <p>{{ $corps_lettre['paragraphe_1'] }}</p>
        <p>{{ $corps_lettre['paragraphe_2'] }}</p>
        <p>{{ $corps_lettre['paragraphe_3'] }}</p>
    </div>

    <!-- Formule de politesse -->
    <div>
        <p>{{ $formule_politesse }}</p>
    </div>

    <!-- Signature -->
    <div class="signature">
        <p><strong>{{ $signature }}</strong><br>
        </p>
    </div>
</body>
</html>
