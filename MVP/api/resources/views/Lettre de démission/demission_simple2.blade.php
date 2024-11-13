<!-- resources/views/demission_remerciement.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Démission avec Remerciements</title>
    <link rel="stylesheet" href="{{ public_path('pdf/demission2.css') }}">
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

        <p>Je vous informe par la présente de ma décision de quitter mon poste de [poste occupé] au sein de votre entreprise, avec effet à compter du [date de départ].</p>

        <p>Après mûre réflexion, j'ai pris cette décision pour des raisons personnelles/professionnelles, qui me poussent à poursuivre d’autres perspectives de carrière. Je respecterai le préavis de [durée du préavis] stipulé dans mon contrat de travail, mon dernier jour sera donc le [date de fin de préavis].</p>

        <p>Je tiens à exprimer ma profonde gratitude pour le soutien et les opportunités de développement que vous m'avez offertes. J'ai beaucoup appris et acquis des compétences précieuses, grâce à votre confiance en moi.</p>

        <p>Je m'engage à assurer une transition fluide de mes responsabilités durant la période de préavis pour ne pas entraver le bon déroulement des activités de l’entreprise.</p>

        <p>Veuillez agréer, Madame, Monsieur, l’expression de mes sentiments respectueux et de mes remerciements sincères.</p>

        <p>Signature :</p>
        <p>________________________</p>
    </div>
</body>
</html>
