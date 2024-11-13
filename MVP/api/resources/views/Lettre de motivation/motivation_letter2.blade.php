<!-- goals_motivation_letter.blade.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lettre de Motivation - Orientée Objectifs</title>
    <link rel="stylesheet" href="{{ public_path('pdf/letterstyle2.css') }}">
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
            Mon objectif principal est de contribuer activement au développement de {{ $company_name }} en intégrant l’équipe de {{ $job_title }}. Fort(e) d’une expérience éprouvée en {{ $related_field }}, je suis prêt(e) à relever les défis que vous proposez.
        </p>

        <p>
            Ma capacité à {{ $specific_goal_1 }} et à {{ $specific_goal_2 }} fait de moi un(e) candidat(e) idéal(e) pour ce poste. Mon approche proactive et ma volonté de progresser répondent aux attentes de votre entreprise.
        </p>

        <p>Je reste disponible pour un entretien et vous remercie pour l’attention portée à ma candidature.</p>

        <p>Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>

        <div class="signature">
            <p>{{ $user_name }}</p>
        </div>
    </div>
</body>
</html>
