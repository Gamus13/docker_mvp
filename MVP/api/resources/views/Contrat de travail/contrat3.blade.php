<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrat de Travail CDI</title>
    <link rel="stylesheet" href="{{ public_path('pdf/stylecontrat3.css') }}">
</head>
<body>
    <div id="contract">
        <h1>Contrat de Travail - CDI</h1>

        <section>
            <h2>Entre les soussignés</h2>
            <p><strong>Employeur :</strong> {{ $data['contrat_de_travail']['company_details']['name'] }}</p>
            <p><strong>Adresse :</strong> {{ $data['contrat_de_travail']['company_details']['city'] }}</p>
            <p><strong>Représenté par :</strong> [Nom du représentant]</p>

            <p>Et</p>

            <p><strong>Salarié :</strong> {{ $data['contrat_de_travail']['employer_details']['name'] }}</p>
            <p><strong>Adresse :</strong> {{ $data['contrat_de_travail']['employer_details']['address'] }}</p>
        </section>

        <section>
            <h2>Objet du Contrat</h2>
            <p>Le présent contrat est un contrat à durée indéterminée régi par les dispositions du Code du Travail. Le salarié est embauché en tant que {{ $data['contrat_de_travail']['employer_details']['occupation'] }} à partir du {{ \Carbon\Carbon::now()->format('d F Y') }}.</p>
        </section>

        <section>
            <h2>Article I – Durée de la Période d'Essai</h2>
            <p>La période d'essai est fixée à [Durée de la période d'essai] renouvelable une fois selon les dispositions légales en vigueur.</p>
        </section>

        <section>
            <h2>Article II – Rémunération</h2>
            <p>Le salarié percevra un salaire brut mensuel de [Montant en euros] €, versé à la fin de chaque mois.</p>
        </section>

        <section>
            <h2>Article III – Horaires de Travail</h2>
            <p>Les horaires de travail sont de [Nombre d'heures par semaine] heures par semaine, réparties selon l’organisation de l’entreprise.</p>
        </section>

        <section>
            <h2>Article IV – Congés</h2>
            <p>Le salarié bénéficie des congés payés dans les conditions prévues par la loi.</p>
        </section>

        <section>
            <h2> Article V – Confidentialité</h2>
            <p>Le salarié s’engage à respecter la confidentialité des informations de l’entreprise, tant pendant la durée du contrat qu'après sa rupture.</p>
        </section>

        <section>
            <h2>Signature</h2>
            <p>Fait à {{ $data['contrat_de_travail']['company_details']['city'] }}, le {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
            <p>Signature de l'employeur : ________________________</p>
            <p>Signature du salarié : _____________________________</p>
        </section>
    </div>
</body>
</html>
