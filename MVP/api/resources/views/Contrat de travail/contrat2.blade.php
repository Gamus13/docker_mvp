<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrat de Travail CDI</title>
    <link rel="stylesheet" href="{{ public_path('pdf/stylecontrat2.css') }}">
</head>
<body>
    <div class="document">
        <h1>Modèle de Contrat de Travail CDI</h1>

        <section>
            <h2>Entre les soussignés :</h2>
            <p>La société {{ $data['contrat_de_travail']['company_details']['name'] }} dont le siège social est situé à {{ $data['contrat_de_travail']['company_details']['city'] }}, représentée par Madame/Monsieur (nom, prénom), agissant en qualité de (fonction), d’une part,</p>
            <p>ci-après dénommée « {{ $data['contrat_de_travail']['company_details']['name'] }} »</p>
            <p>et</p>
            <p>Madame/Monsieur {{ $data['contrat_de_travail']['employer_details']['name'] }} demeurant à {{ $data['contrat_de_travail']['employer_details']['address'] }}, né(e) le (date de naissance), de nationalité {{ $data['contrat_de_travail']['employer_details']['country'] }}, dont le numéro de sécurité sociale est :</p>
            <p>d’autre part,</p>
            <p>ci-après dénommé « {{ $data['contrat_de_travail']['employer_details']['name'] }} »</p>
            <p>il a été convenu ce qui suit :</p>
        </section>

        <section>
            <h2>Article I – Engagement</h2>
            <p>Mme/M. {{ $data['contrat_de_travail']['employer_details']['name'] }} est engagé(e) au poste proposé par la société {{ $data['contrat_de_travail']['company_details']['name'] }} en qualité de {{ $data['contrat_de_travail']['employer_details']['occupation'] }}, sous réserve des résultats de la visite médicale d’embauche décidant son aptitude. Ce contrat prend effet à compter du (date) à (heures).</p>
        </section>

        <section>
            <h2>Article II – Fonctions</h2>
            <p>La société embauche le salarié à temps complet, en tant que (dénomination de l’emploi), avec la qualification professionnelle de {{ $data['contrat_de_travail']['employer_details']['occupation'] }}, au coefficient (voir convention collective). Mme/M. {{ $data['contrat_de_travail']['employer_details']['name'] }} en sa qualité de {{ $data['contrat_de_travail']['employer_details']['occupation'] }} sera plus particulièrement chargé de {{ $data['contrat_de_travail']['employer_details']['expertise'] }}. Cette liste de tâches est non exhaustive et pourra être complétée en fonction des besoins de l’entreprise.</p>
        </section>

        <section>
            <h2>Article III – Convention et règlement</h2>
            <p>En application de la Convention collective nationale de (dénomination), le salarié relèvera du coefficient (...), position (à préciser), niveau (à préciser). L’ensemble des dispositions de la convention s’applique au présent contrat. Un exemplaire de la convention est disponible au sein de l’établissement.</p>
            <p>Le salarié s’engage également à respecter le règlement intérieur de la société.</p>
        </section>

        <section>
            <h2>Article IV – Période d’essai</h2>
            <p>Le présent contrat est conclu pour une durée indéterminée. Il ne deviendra définitif qu’à l’expiration d’une période d’essai de (jours ou mois). Cette période pourra être prolongée en cas de suspension du contrat et renouvelée selon la convention collective.</p>
        </section>

        <section>
            <h2>Article V – Congés payés</h2>
            <p>Conformément aux conditions légales et conventionnelles, le salarié a droit aux congés payés annuels.</p>
        </section>

        <section>
            <h2>Article VI – Lieu de travail</h2>
            <p>Le lieu de travail du salarié est situé à {{ $data['contrat_de_travail']['company_details']['city'] }}. Il pourra être modifié temporairement ou définitivement à l’intérieur du secteur géographique de la société.</p>
        </section>

        <section>
            <h2>Article VII – Durée du travail</h2>
            <p>Le salarié est assujetti à l’horaire de travail de l’établissement. La durée hebdomadaire sera de 35 heures, avec possibilité d'heures supplémentaires.</p>
        </section>

        <section>
            <h2>Article VIII – Rémunération</h2>
            <p>La rémunération mensuelle brute sera de (montant) euros ou votre monnaie . Toute heure supplémentaire sera majorée conformément aux dispositions en vigueur.</p>
        </section>

        <section>
            <h2>Article IX – Rupture du contrat</h2>
            <p>Ce contrat peut être rompu par chacune des parties avec respect du délai de préavis.</p>
        </section>

        <section>
            <h2>Article X – DPAE</h2>
            <p>La société a réalisé la Déclaration Préalable à l’Embauche auprès de l’URSSAF de {{ $data['contrat_de_travail']['company_details']['city'] }}.</p>
        </section>

        <section>
            <h2>Article XI – Retraite complémentaire et prévoyance</h2>
            <p>Le salarié sera affilié auprès de la caisse de retraite complémentaire (dénomination) et de l’organisme de prévoyance (dénomination).</p>
        </section>

        <footer>
            <p>Fait en double exemplaire le {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
            <p>Signature de l’employeur ___________________, précédée de la mention « lu et approuvé » </p>
            <p>Signature du salarié ________________, précédée de la mention « lu et approuvé » </p>
        </footer>
    </div>
</body>
</html>
