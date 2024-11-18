<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Demande de Stage</title>
    <style>
        /* Mise en page format A4 */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12pt;
            line-height: 1.6;
            width: 210mm;
            height: 297mm;
            box-sizing: border-box;
        }
        .page {
            width: 170mm; /* Largeur réduite pour laisser des marges */
            padding: 20mm; /* Marges internes pour centrer le contenu */
            margin: auto; /* Centrer la page */
            background-color: white;
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 15mm;
            font-size: 14pt;
        }
        .sender, .receiver, .subject, .date-location, .content, .closing, .signature {
            margin-bottom: 10mm;
        }
        .sender, .subject {
            width: 50%;
        }
        .sender {
            float: left;
            text-align: left;
        }
        .receiver {
            float: right;
            width: 50%;
            text-align: left;
        }
        .date-location {
            clear: both;
            text-align: right;
            margin-top: 20mm;
        }
        .subject {
            font-weight: bold;
            text-transform: uppercase;
            clear: both;
            margin-top: 10mm;
        }
        .content {
            margin-top: 10mm;
            text-align: justify;
        }
        .closing {
            margin-top: 20mm;
        }
        .signature {
            margin-top: 30mm;
        }
        p {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="page">
        <!-- En-tête de la lettre -->
        <div class="header">
            Demande de stage auprès du pôle emploi
        </div>

        <!-- Information de l'expéditeur -->
        <div class="sender">
            <p>{{ $data['demande_de_stage']['employer_details']['name'] }}<br>
            {{ $data['demande_de_stage']['employer_details']['address'] }}<br>
            Montreuil<br>
            62100</p>
        </div>

        <!-- Information du destinataire -->
        <div class="receiver">
            <p>[Nom de l’entreprise]<br>
            [Adresse de l’entreprise]<br>
            [Code postal, Ville]</p>
        </div>

        <!-- Date et lieu -->
        <div class="date-location">
            Montreuil, le 20 janvier 2014
        </div>

        <!-- Objet de la lettre -->
        <div class="subject">
            Objet : Lettre de discussion
        </div>

        <!-- Contenu de la lettre -->
        <div class="content">
            <p>Monsieur (Dirigeant Supérieur),</p>

            <p>Je me permets de vous adresser ce courrier afin de vous exposer mon projet chez
            [Nom de l’entreprise] qui prendra place du 13 février au 18 février 2014.</p>

            <p>Mon objectif consiste à suivre un stage au sein de votre équipe pour une durée
            limitée dans le but d’acquérir de l'expérience professionnelle. Ce stage de courte
            durée a pour objectif principal d’améliorer mes compétences pratiques dans mon domaine
            de formation.</p>

            <p>Je suis disponible tous les jours ouvrables de la semaine entre 9h et 16h30 pour une immersion
            complète. Je me tiens à votre disposition pour toute information complémentaire et pour un
            entretien de sélection.</p>
        </div>

        <!-- Formule de politesse et signature -->
        <div class="closing">
            <p>En vous remerciant par avance, veuillez croire, Monsieur, en l’expression distinguée de mes
            salutations respectueuses.</p>
        </div>

        <div class="signature">
            <p>Guillaume Tremblay</p>
        </div>
    </div>
</body>
</html>
