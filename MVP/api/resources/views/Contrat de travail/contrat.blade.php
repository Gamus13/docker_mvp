<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrat de Travail</title>
    <link rel="stylesheet" href="{{ public_path('pdf/contrat.css') }}">
</head>
<body>

    <div class="contract">
        <h1>CONTRAT DE TRAVAIL</h1>
        <p>(veuillez remplacer le modèle par les articles de lois légales)</p>

        <section class="parties">
            <p><strong>Les parties soussignées:</strong> M./Mme: (noms du responsable qui redige le document) pour {{ $data['contrat_de_travail']['company_details']['name'] }}</p>
            <p><strong>D’UNE PART.</strong></p>
            <p><strong>ET M./Mme:</strong> {{ $data['contrat_de_travail']['employer_details']['name'] }}</p>
            <p><strong>Né(e) le:</strong> …………………………</p>
            <p><strong>Fils (Fille) de:</strong> …………………………</p>
            <p><strong>Exerçant la profession de:</strong> {{ $data['contrat_de_travail']['employer_details']['occupation'] }}</p>
            <p><strong>Nationalité:</strong> {{ $data['contrat_de_travail']['employer_details']['country'] }}</p>
            <p><strong>Carte d’Identité N°:</strong> …………………………………… En date ………………………………………</p>
            <p><strong>D’AUTRE PART </strong></p>
            <p>Il a été convenu ce qui suit :</p>
        </section>

        <section class="articles">
            <h2>ARTICLE 1</h2>
            <p><strong>M./Mme:</strong> {{ $data['contrat_de_travail']['employer_details']['name'] }} est engagé en qualité de {{ $data['contrat_de_travail']['employer_details']['occupation'] }} pour servir à {{ $data['contrat_de_travail']['employer_details']['expertise'] }} à compter du {{ \Carbon\Carbon::now()->format('d F Y') }}.</p>
            <p>L’intéressé a pris acte du manuel des procédures, des définitions de tâches, de la charte éthique, et accepté de pallier à toutes urgences, vu la particularité de son domaine de travail. Il respectera le secret médical, de délibération en toute circonstance, en tout lieu, et en tout temps.</p>
            <p>La durée du présent contrat est <strong>INDETERMINÉE</strong>.</p>

            <h2>ARTICLE 2 (Adapter en fonction de votre pays)</h2>
            <p><strong>M./Mme:</strong> {{ $data['contrat_de_travail']['employer_details']['name'] }} est classé(e) à la catégorie professionnelle suivante ………………………….</p>
            <p>IL/ELLE PERCEVRA LA REMUNERATION SUIVANTE </p>
            <ul>
                <li>TOTAL BRUT: …………………………</li>
                <li>Retenue (retraite AMO)</li>
                <li>INPS (base …………………………) = …………………………</li>
                <li>Part patronale 19.9% = …………………………</li>
                <li>Part employé = …………………………</li>
                <li>Retraite 3.6% = …………………………</li>
                <li>AMO 3.06% = …………………………</li>
                <li>Autres primes et indemnités non taxables: …………………………</li>
                <li>NET À PAYER: …………………………</li>
            </ul>

            <h2>ARTICLE 3</h2>
            <p><strong>M./Mme:</strong> {{ $data['contrat_de_travail']['employer_details']['name'] }} pourra bénéficier en ce lieu de ses congés à raison de deux jours et demi par mois de service effectif.</p>

            <h2>ARTICLE 4 (Adapter en fonction de votre pays)</h2>
            <p>Pour toute disposition non précisée explicitement au présent contrat, il est fait expressément référence aux textes suivants:</p>
            <ul>
                <li>La loi n° 92-020 du 23/09/1992 instituant un Code de travail en {{ $data['contrat_de_travail']['company_details']['country'] }}.</li>
                <li>La loi n° 93-041/ANRM du 12/08/1999 instituant un Code de Prévoyance Sociale en {{ $data['contrat_de_travail']['company_details']['country'] }}.</li>
                <li>La loi n° 09-015 du 26 juin 2010 portant institution du régime de l’Assurance Maladie Obligatoire du {{ $data['contrat_de_travail']['company_details']['country'] }}.</li>
                <li>Textes réglementaires pris pour l’application des lois suivantes:</li>
                <li>Statut: …………………………</li>
                <li>Convention collective: …………………………</li>
                <li>Accord d’établissement: …………………………</li>
            </ul>

            <h2>ARTICLE 5 (Adapter en fonction de votre pays)</h2>
            <p>Le présent contrat est indexé aux conventions successives entre l’Association et le CNLS dans le cadre de la mise en œuvre des activités subventionnées par le Fonds mondial de la lutte contre le VIH. Ainsi il est lié à la gestion de tous les cas de force majeure subis par les partenaires de {{ $data['contrat_de_travail']['company_details']['country'] }} indépendamment de leur volonté.</p>
            <p>Cependant l’Association reste libre par rapport à sa politique de gestion des ressources humaines, tenant compte de la qualification, de l’ancienneté et de la promotion du résultat dû à la compétence et au dévouement.</p>
            <p>Ces dispositions ne pourront servir de moyen d’abus, de quelque nature que ce soit ni par l’employeur ni par l’employé, et restent dans l’esprit du Code du travail.</p>

            <p>Le présent contrat écrit est exempt de tous droits de timbre et d’enregistrement. Il sera toutefois établi en quatre exemplaires et soumis après visite médicale du travailleur au visa de l’Inspecteur du Travail.</p>
            <p>Conformément à l’article 24 du Code du travail.</p>
        </section>

        <div class="signature">
            <p>…………………………, le {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
            <p><strong>L’EMPLOYEUR</strong> ______________________________</p>
            <p><strong>LE TRAVAILLEUR</strong> ______________________________</p>
        </div>
    </div>

</body>
</html>
