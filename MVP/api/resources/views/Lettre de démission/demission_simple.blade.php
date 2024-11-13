<!-- resources/views/demission_simple.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Démission</title>
    <link rel="stylesheet" href="{{ public_path('pdf/demission.css') }}">
</head>
<body>
    <div id="letter">
        <p><strong>[Nom du salarié]</strong></p>
        <p>[Adresse du salarié]</p>
        <p>[Code postal, Ville]</p>
        <p>Date : {{ \Carbon\Carbon::now()->format('d F Y') }}</p>

        <p><strong>À l’attention de</strong></p>
        <p>[Nom de l'entreprise]</p>
        <p>[Adresse de l'entreprise]</p>

        <h1>Objet : Démission</h1>

        <p>Madame, Monsieur,</p>

        <p>Par la présente, je vous informe de ma décision de démissionner de mon poste de [poste occupé] au sein de votre entreprise, à compter du [date de départ].</p>

        <p>Je souhaite respecter le préavis de [durée du préavis] conformément aux dispositions de mon contrat de travail. Mon dernier jour de travail sera donc le [date de fin de préavis].</p>

        <p>Je tiens à vous remercier sincèrement pour les opportunités professionnelles et l'expérience acquise au sein de votre entreprise. Cette période a été enrichissante, et j'ai apprécié de travailler avec vous ainsi que l'ensemble de l'équipe.</p>

        <p>Je reste à votre disposition pour faciliter la transition de mes responsabilités durant cette période de préavis.</p>

        <p>Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.</p>

        <p>Signature :</p>
        <p>________________________</p>
    </div>
</body>
</html>
