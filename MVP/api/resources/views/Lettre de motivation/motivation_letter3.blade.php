<!-- skills_motivation_letter.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Motivation - Axée sur les Compétences</title>
    <link rel="stylesheet" href="{{ public_path('pdf/letterstyle3.css') }}">
</head>
<body>
    <div id="letter">
        <header>
            <p>{{ $user_name }}<br>{{ $user_address }}<br>{{ $user_city }}, {{ $user_zip }}</p>
            <p>{{ $company_name }}<br>{{ $company_address }}<br>{{ $company_city }}, {{ $company_zip }}</p>
        </header>

        <h1>Candidature au poste de {{ $job_title }}</h1>

        <p>{{ $date_today }}</p>

        <p>Madame, Monsieur,</p>

        <p>
            Passionné(e) par {{ $field_of_interest }} et doté(e) de compétences spécifiques en {{ $key_skills }}, je suis très intéressé(e) par le poste de {{ $job_title }} au sein de {{ $company_name }}. Je suis convaincu(e) que mon expertise me permettra d’apporter une valeur ajoutée à vos équipes.
        </p>

        <p>
            Dans mes expériences précédentes, j'ai démontré des capacités en {{ $specific_skill }} et {{ $another_skill }}, compétences qui seraient un atout pour mener à bien les missions de ce poste.
        </p>

        <p>Je reste à votre disposition pour toute information complémentaire.</p>

        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div class="signature">
            <p>{{ $user_name }}</p>
        </div>
    </div>
</body>
</html>
