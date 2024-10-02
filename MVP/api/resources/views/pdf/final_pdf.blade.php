<!DOCTYPE html>
<html>
<head>
    <title>Lettre de licenciement</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            margin: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{ $finalpdfData['objet'] }}</h1>
    </div>
    <div class="content">
        <p>{{ $finalpdfData['formule_appel'] }}</p>
        <p>{{ $finalpdfData['corps_lettre']['introduction'] }}</p>
        <p>{{ $finalpdfData['corps_lettre']['paragraphe_1'] }}</p>
        <p>{{ $finalpdfData['corps_lettre']['paragraphe_2'] }}</p>
        <p>{{ $finalpdfData['corps_lettre']['paragraphe_3'] }}</p>
        <p>{{ $finalpdfData['formule_politesse'] }}</p>
    </div>
    <div class="footer">
        <p>{{ $finalpdfData['signature'] }}</p>
    </div>
</body>
</html>
