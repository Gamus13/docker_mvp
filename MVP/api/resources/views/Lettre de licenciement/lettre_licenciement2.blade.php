<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ public_path('pdf/pdf.css') }}">
    <title>Lettre de Licenciement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
        }
        .signature {
            margin-top: 50px;
        }
    </style>
</head>
<body>

    <h1>Lettre de licenciement avec effet immédiat</h1>
    <p><strong>Article L.124-10 du Code du travail</strong></p>

    <p><strong>{{ $coordonnees_employeur['nom'] }}</strong><br>
    {{ $coordonnees_employeur['adresse'] }}</p>

    <p><strong>{{ $coordonnees_employe['nom'] }}</strong><br>
    {{ $coordonnees_employe['adresse'] }}</p>

    <p><strong>{{ $date }}</strong></p>

    <p>Lettre recommandée (ou remise en mains propres contre accusé de réception)</p>

    <h2>Concerne :</h2>
    <p>Résiliation avec effet immédiat de votre contrat de travail conclu en date du <strong>[date]</strong></p>

    <p>Madame / Monsieur,</p>

    <p>Par la présente, nous sommes au regret de vous informer que nous avons décidé de résilier avec effet immédiat (pour motif grave conformément à l’article L.124-10 du Code du travail) votre contrat de travail conclu en date du <strong>[date]</strong>.</p>

    <p>Les motifs de licenciement sont les suivants :</p>
    <p>Mentionner le motif grave soit tout fait ou faute qui rend immédiatement et définitivement impossible le maintien des relations de travail.</p>

    <p>(En cas de remise en mains propres, nous vous prions de confirmer la réception de l’original en apposant la mention « Reçu en mains propres à <strong>[lieu]</strong> le <strong>[date]</strong> » ainsi que votre signature sur la copie).</p>

    <p>Veuillez agréer, Madame / Monsieur, l’expression de mes salutations distinguées.</p>

    <div class="signature">
        <p>__________________________________</p>
        <p>(Signature de l’employeur)</p>
    </div>

</body>
</html>
