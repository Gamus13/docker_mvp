<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demande de Stage</title>
    <style>
        /* Styles de base pour un rendu PDF A4 centré */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #000;
            line-height: 1.6;
            font-size: 12pt;
            width: 210mm;
            height: 297mm;
        }
        .container {
            width: 170mm; /* pour éviter de toucher les bords du PDF */
            margin: 0 auto;
            padding: 20mm;
            background-color: white;
            box-sizing: border-box;
            margin-right: 22px;
        }
        .sender, .receiver, .date-location, .subject, .content, .closing, .signature {
            margin-bottom: 10px;
        }
        .sender {
            float: left;
            width: 50%;
        }
        .receiver {
            float: right;
            width: 45%;
            margin-top: 20%; /* Ajustement pour l'espacement du destinataire */
            text-align: left;
        }
        .date-location {
            clear: both;
            text-align: right;
            margin-top: 20px;
        }
        .subject {
            font-weight: bold;
            text-transform: uppercase;
            margin-top: 15px;
        }
        .content {
            margin-top: 20px;
            text-align: justify;
        }
        .closing {
            margin-top: 20px;
        }
        .signature {
            margin-top: 40px;
        }
        p {
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Information de l'expéditeur -->
        <div class="sender">
            <p>{{ $data['demande_de_stage']['employer_details']['name'] }}</p>
            <p>{{ $data['demande_de_stage']['employer_details']['address'] }}</p>
            <p>Tél : </p>
            <p>{{ $data['demande_de_stage']['employer_details']['email'] }}</p>
        </div>

        <!-- Information du destinataire -->
        <div class="receiver">
            <p>Cabinet dentaire Gambetta</p>
            <p>2 Place Gambetta</p>
            <p>75020 Paris</p>
        </div>

        <!-- Date et lieu -->
        <div class="date-location">
            <p>Fait à {{ $data['demande_de_stage']['employer_details']['country'] }}, le {{ \Carbon\Carbon::now()->format('d F Y') }}</p>
        </div>

        <!-- Objet de la lettre -->
        <div class="subject">
            <p>Objet : Demande de stage </p>
        </div>

        <!-- Contenu de la lettre -->
        <div class="content">
            <p>Madame, Monsieur,</p>

            <p>Je formule ce courrier dans le cadre de ma préparation au titre professionnel SAMS, et cherche un stage de 2 mois dans votre cabinet dentaire, à compter du 1er décembre 2022.</p>

            <p>Ce stage me permettra de démontrer ma motivation, mes compétences en secrétariat médical et ma capacité à m'adapter. Ayant de bonnes compétences relationnelles, je sais m'adapter à mes interlocuteurs et j'ai acquis une bonne expérience dans le domaine professionnel. Maîtrisant les outils bureautiques et les logiciels requis, je suis prête à contribuer aux missions de secrétariat.</p>

            <p>Je suis également motivée par l’opportunité d’approfondir mes compétences en collaboration avec une équipe dynamique et professionnelle. Ce stage serait une étape clé pour moi en vue d’acquérir une expérience significative dans le secteur médical.</p>

            <p>Enfin, je me tiens à votre disposition pour toute information complémentaire et pour un entretien de sélection.</p>
        </div>

        <!-- Formule de politesse et signature -->
        <div class="closing">
            <p>Dans l’attente de vous rencontrer, veuillez agréer, Madame, Monsieur, mes salutations respectueuses.</p>
        </div>

        <div class="signature">
            <p>signature :</p>
            <p>{{ $data['demande_de_stage']['employer_details']['name'] }}</p>
        </div>
    </div>
</body>
</html>
