<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devis</title>
    <style>
        /* Styles de base */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 1rem; /* Taille de police relative */
            line-height: 1.5;
            background-color: #fff;
            width: 100%;
            height: 100vh;
            box-sizing: border-box;
        }
        .page {
            width: calc(100% - 2px);  /* Compense la bordure de 1px sur chaque côté */
            max-width: 210mm;          /* Limite la largeur à 210mm */
            height: 100%;
            margin-left: -25px;         /* Centrage horizontal */
            margin-right: auto;        /* Centrage horizontal */
            padding: 20mm;             /* Ajout de l'espace intérieur */
            box-sizing: border-box;    /* Assure que padding et bordures sont inclus dans la largeur */
            /* border: 1px solid #ddd;    */
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        header .logo {
            width: 110px;
            height: 120px;
            background-color: #FFD700;
            border-radius: 50%;
            text-align: center;
            line-height: 60px;
            font-weight: bold;
            color: black;
        }
        header .details {
            text-align: right;
        }
        .details p {
            margin: 5px;
            font-size: 1rem; /* Taille de police augmentée */
        }
        .info {
            display: flex;
            /* justify-content: space-between; */
            margin-bottom: 60px;
        }
        .info div {
            width: 45%;
        }
        .info p {
            margin: 0;
            font-size: 1rem; /* Taille de police augmentée */
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 12px; /* Plus d'espace pour améliorer la lisibilité */
            text-align: left;
        }
        .table th {
            background-color: #f2f2f2;
        }
        .totals {
            text-align: right;
            margin-bottom: 30px;
        }
        .totals p {
            margin: 5px 0;
            font-size: 1rem; /* Taille de police augmentée */
        }
        .signature {
            text-align: left;
            margin-top: 20px;
        }
        .signature p{
            margin-top: -4%;
        }
        footer {
            text-align: center;
            font-size: 1rem; /* Taille de police augmentée */
            color: #777;
            margin-top: -15px;
        }

        /* Adaptation responsive */
        @media (max-width: 768px) {
            .page {
                padding: 10mm;
            }
            header .logo {
                width: 50px;
                height: 50px;
                font-size: 1rem; /* Réduction du logo */
            }
            .info {
                flex-direction: column;
                margin-bottom: 40px;
            }
            .info div {
                width: 100%;
                margin-bottom: 20px;
            }
            .table th, .table td {
                font-size: 0.9rem; /* Taille de texte réduite pour les petits écrans */
                padding: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="page">
        <!-- En-tête -->
        <header>
            <div class="logo">Logo</div>
            <div class="details">
                <p style="font-size: 1rem; font-weight: bold;">DEVIS -1</p>
                <p>{{ \Carbon\Carbon::now()->format('d F Y') }}</p>
            </div>
        </header>

        <!-- Informations de l'expéditeur et du destinataire -->
        <div class="info">
            <div>
                <p><strong>Prestataire</strong></p>
                <p>{{ $data['quote']['client_details']['name'] }}</p>
                <p>{{ $data['quote']['client_details']['address'] }}</p>
                <p>{{ $data['quote']['client_details']['postal_code'] }}</p>
                <p>Tel: </p>
            </div>
            <div>
                <p><strong>Client</strong></p>
                <p>{{ $data['quote']['company_details']['name'] }}</p>
                <p>{{ $data['quote']['company_details']['address'] }}</p>
                @if(isset($quote['client_details']['email']))
                    {{ $quote['client_details']['email'] }}
                @else
                    <p>Email non fourni.</p>
                @endif
            </div>
        </div>

        <!-- Tableau des détails -->
        <table class="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Qté</th>
                    <th>Unité</th>
                    <th>Prix unitaire</th>
                    <th>Montant</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Création de site internet</td>
                    <td>1,00</td>
                    <td>pce</td>
                    <td>1 500,00 €</td>
                    <td>1 800,00 €</td>
                </tr>
                <tr>
                    <td>Création de logo</td>
                    <td>1,00</td>
                    <td>pce</td>
                    <td>150,00 €</td>
                    <td>180,00 €</td>
                </tr>
                <tr>
                    <td>Maintenance mensuelle site internet</td>
                    <td>12,00</td>
                    <td>h</td>
                    <td>50,00 €</td>
                    <td>720,00 €</td>
                </tr>
            </tbody>
        </table>

        <!-- Totaux -->
        <div class="totals">
            <p><strong>Total HT: 2 250,00 €</strong></p>
            <p><strong>TVA 20,0 %: 450,00 €</strong></p>
            <hr style="width: 25%; float: right;">
            <br>
            <p><strong>Total TTC: 2 700,00 €</strong></p>
        </div>

        <!-- Signature -->
        <div class="signature">
            <h4>Date et signature du client</h4>
            <p>(Précédée de la mention "Bon pour accord")</p>
            <hr style="width: 80%; margin-top: 100px;">
        </div>

        <!-- Pied de page -->
        <footer>
            <p>Sites & Créations - 12 Rue des Macarons 89100 Sens - Numéro de TVA: 123454545</p>
        </footer>
    </div>
</body>
</html>
