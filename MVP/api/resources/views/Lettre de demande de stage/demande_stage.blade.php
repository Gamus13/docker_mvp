<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Demande de Stage</title>
    <link rel="stylesheet" href="{{ public_path('pdf/demande_stage.css') }}">
</head>
<body>
    <div id="letter">
        <h1>Lettre de Demande de Stage</h1>

        <section>
            <p><strong>Nom :</strong> {{ $data['demande_de_stage']['employer_details']['name'] }}</p>
            <p><strong>Adresse :</strong> {{ $data['demande_de_stage']['employer_details']['address'] }}</p>
            <p><strong>Téléphone :</strong> [Votre numéro de téléphone]</p>
            <p><strong>Email :</strong> {{ $data['demande_de_stage']['employer_details']['email'] }}</p>
            <p><strong>Date :</strong> {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
        </section>

        <section>
            <p><strong>Objet :</strong> Demande de stage</p>
        </section>

        <section>
            <p><strong>À l'attention de :</strong></p>
            @if(isset($data['demande_de_stage']['company_details']))
                <p>{{ $data['demande_de_stage']['company_details']['name'] ?? 'Nom de l\'entreprise' }}</p>
                <p>{{ $data['demande_de_stage']['company_details']['address'] ?? 'Adresse de l\'entreprise' }}</p>
            @else
                <p>Informations de l'entreprise non disponibles.</p>
            @endif
        </section>

        <section>
            <p>
                Madame, Monsieur,
            </p>
            <p>
                Actuellement étudiant(e) en {{ $data['demande_de_stage']['employer_details']['etude'] }} à {{ $data['demande_de_stage']['employer_details']['universite'] }}, je suis à la recherche d'un stage pratique qui me permettrait de mettre en application les connaissances théoriques acquises au cours de ma formation. C’est avec un grand intérêt que je vous soumets ma candidature pour un stage au sein de votre entreprise.
            </p>
            <p>
                Je suis particulièrement intéressé(e) par le domaine de {{ $data['demande_de_stage']['company_details']['secteur'] ?? 'votre domaine' }} et je suis convaincu(e) que travailler dans votre organisation serait une expérience formatrice et enrichissante. Mes compétences en {{ $data['demande_de_stage']['employer_details']['expertise'] }} et ma capacité d’adaptation me permettront, je l’espère, de contribuer positivement à vos projets.
            </p>
            <p>
                Dans l’attente d’une réponse favorable de votre part, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
            </p>
        </section>

        <section>
            <p>Signature</p>
        </section>
    </div>
</body>
</html>
