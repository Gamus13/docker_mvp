<!-- classic_motivation_letter.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Motivation - Classique</title>
    <link rel="stylesheet" href="{{ public_path('pdf/letterstyle1.css') }}">
</head>
<body>
    <div id="letter">
        <header>
            <p>{{ $user_name }}<br>{{ $user_address }}<br>{{ $user_city }}, {{ $user_zip }}</p>
            <p>{{ $company_name }}<br>{{ $company_address }}<br>{{ $company_city }}, {{ $company_zip }}</p>
        </header>

        <h1>Lettre de Motivation pour le poste de {{ $job_title }}</h1>

        <p>{{ $date_today }}</p>

        <p>Madame, Monsieur,</p>

        <p>
            Je vous écris afin de postuler au poste de {{ $job_title }} au sein de votre entreprise. Avec une solide expérience en {{ $relevant_field }} et un fort désir de contribuer à {{ $company_name }}, je suis persuadé(e) que mes compétences et ma motivation correspondent à vos attentes.
        </p>

        <p>
            Au cours de mes précédentes expériences, j'ai développé des compétences essentielles telles que {{ $skill_1 }}, {{ $skill_2 }}, et {{ $skill_3 }}. Mon autonomie et ma capacité à travailler en équipe me permettent de m’adapter rapidement aux besoins d’une entreprise comme la vôtre.
        </p>

        <p>
            Je vous remercie de l’attention que vous porterez à ma candidature et reste à votre disposition pour toute information complémentaire.
        </p>

        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div class="signature">
            <p>{{ $user_name }}</p>
        </div>
    </div>
</body>
</html>
