<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/invoice', function () {
//     // Données fictives pour l'exemple
//     $invoice = [
//         'invoice_number' => 'INV-2024-001',
//     ];

//     $client = [
//         'name' => 'John Doe',
//         'address' => '123 Main Street, Springfield',
//         'phone' => '+1 234 567 890',
//         'email' => 'john.doe@example.com',
//     ];

//     $company = [
//         'name' => 'My Company Inc.',
//         'address' => '456 Business Blvd, Metropolis',
//         'phone' => '+1 987 654 321',
//         'email' => 'info@mycompany.com',
//         'vat_number' => 'FR123456789',
//     ];

//     $items = [
//         [
//             'quantity' => 2,
//             'description' => 'Product A',
//             'unit_price' => 50.00,
//             'total_amount' => 100.00,
//         ],
//         [
//             'quantity' => 1,
//             'description' => 'Service B',
//             'unit_price' => 150.00,
//             'total_amount' => 150.00,
//         ],
//     ];

//     $totals = [
//         'subtotal' => 250.00,
//         'tax' => 50.00,
//         'total' => 300.00,
//     ];

//     $payment_terms = [
//         'methods' => ['Virement bancaire', 'Carte de crédit', 'Paypal'],
//         'bank_details' => [
//             'bank_name' => 'Banque XYZ',
//             'iban' => 'FR7630004000031234567890143',
//             'bic' => 'BNPAFRPP',
//         ],
//         'conditions' => 'Paiement à 30 jours',
//     ];

//     $notes = 'Merci de régler cette facture sous 30 jours.';

//     // Passe les données à la vue
//     return view('Facture.invoice', compact('invoice', 'client', 'company', 'items', 'totals', 'payment_terms', 'notes'));
// });



// Route::get('/invoice', function () {
//     $data = [
//         'date' => '2023-03-15', // Exemple de date
//         'invoice_number' => '123456',
//         'client_name' => 'Marcel Noumsi',
//         'client_address' => 'Yaoundé, Centre, Cameroun',
//         'client_postal_code' => 'CP1234',
//         'client_country' => 'Cameroun',
//         'company_name' => 'SendShort',
//         'company_address' => '456 Elm St, Anytown, USA 12345',
//         'company_postal_code' => '12345',
//         'company_email' => 'info@sendshort.com',
//         'items' => [
//             ['service' => 'Starter Plan', 'description' => '1 month subscription', 'rate' => '15', 'qty' => '1', 'amount' => '15'],
//             ['service' => 'Subtitles Pro', 'description' => '1 month subscription', 'rate' => '15', 'qty' => '1', 'amount' => '15'],
//         ],
//         'subtotal' => '30',
//         'tax' => '0',
//         'total' => '30'
//     ];

//     return view('Facture.invoice', $data);
// });

Route::get('/devis', function () {
    return view('Devis.devis');
});

// la route fonctionne
Route::get('/invoice3', function () {
    $items = [
        ['description' => 'Item 1', 'details' => 'Description of item 1', 'quantity' => 2, 'price' => 50, 'total' => 100],
        ['description' => 'Item 2', 'details' => 'Description of item 2', 'quantity' => 1, 'price' => 75, 'total' => 75],
    ];

    // Variables pour le total
    $subTotal = 175;
    $tax = $subTotal * 0.10;
    $dueTotal = $subTotal + $tax;
    $grandTotal = $dueTotal;
    $totalDue = $grandTotal;

    return view('Facture.invoice3', compact('items', 'subTotal', 'tax', 'dueTotal', 'grandTotal', 'totalDue'));
})->name('invoice.show');




Route::get('/invoice2', function () {
    return view('Facture.invoice2');
});


Route::get('/Licenciement', function () {
    // Préparer les données fictives
    $coordonnees_employeur = [
        'nom_entreprise' => 'Nom de l\'Entreprise',
        'adresse_entreprise' => '123 Rue de l\'Exemple',
        'code_postal_entreprise' => '75000',
        'ville_entreprise' => 'Paris',
    ];

    $coordonnees_employe = [
        'nom' => 'Jean Dupont',
        'adresse' => '456 Avenue des Test',
        'code_postal' => '75001',
        'ville' => 'Paris',
    ];

    $date = date('d/m/Y'); // Date actuelle
    $objet = 'Notification de licenciement';
    $formule_appel = 'Monsieur Dupont,';
    $corps_lettre = [
        'introduction' => 'Nous vous informons par la présente de notre décision de mettre fin à votre contrat de travail.',
        'paragraphe_1' => 'Cette décision fait suite à plusieurs avertissements concernant votre performance.',
        'paragraphe_2' => 'Nous vous remercions pour le temps passé au sein de notre entreprise et vous souhaitons le meilleur pour l’avenir.',
        'paragraphe_3' => 'Vous pouvez contacter notre service des ressources humaines pour toute question relative à votre départ.',
    ];

    $formule_politesse = 'Veuillez agréer, Monsieur, l\'expression de nos salutations distinguées.';
    $signature = 'Directeur Général';

    // Retourner la vue avec les données
    return view('Lettre de licenciement.lettre_licenciement', compact(
        'coordonnees_employeur',
        'coordonnees_employe',
        'date',
        'objet',
        'formule_appel',
        'corps_lettre',
        'formule_politesse',
        'signature'
    ));
});

Route::get('/licenciement-modele', function () {
    // Préparer les données fictives pour la nouvelle lettre
    $coordonnees_employeur = [
        'nom' => 'Nom de l\'Employeur',
        'adresse' => '123 Rue de l\'Exemple',
    ];

    $coordonnees_employe = [
        'nom' => 'Jean Dupont',
        'adresse' => '456 Avenue des Test',
    ];

    $date = date('d/m/Y'); // Date actuelle

    // Retourner la vue avec les données
    return view('Lettre de licenciement.lettre_licenciement2', compact(
        'coordonnees_employeur',
        'coordonnees_employe',
        'date'
    ));
});


Route::get('/devis2', function () {
    return view('Devis.devis2');
});
