<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class MailSenderController extends Controller
{
    //
    public function sendEmail(Request $request)
    {
        $mail = new PHPMailer(true);

        try {
            // Configuration du serveur SMTP de Gmail
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'marcelnoumsi8@gmail.com';
            $mail->Password   = 'lrnfxlkffpaacuns';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            // Configurez l'encodage
            $mail->CharSet = 'UTF-8';

            // Adresse expéditeur (utilisée pour l'authentification SMTP)
            $mail->setFrom($request->email, $request->name);

            // Adresse destinataire
            $mail->addAddress('marcelnoumsi8@gmail.com');

            // Contenu de l'e-mail
            $mail->isHTML(true);
            $mail->Subject = "Formulaire de soumission de : " . $request->noms;
            $mail->Body    = "<h3>Noms : " . $request->noms . "</h3><br>
                            <h3>Email : " . $request->email . "</h3><br>
                            <h3>Message : " . $request->message . "</h3><br>";

            // Envoyer l'e-mail au destinataire principal
            $mail->send();

            // Envoyer l'e-mail de confirmation à l'adresse insérée
            $mail->clearAddresses();
            $mail->addAddress($request->email);
            $mail->Subject = "Confirmation of receipt of your message";
            $mail->Body    = "Dear " . $request->noms . ",<br><br>
                            Thank you for taking the time to contact us. This email is to confirm that we have received your message. Your request is important to us and we will do our utmost to respond as soon as possible.<br><br>
                            Please note that we handle a large number of requests daily, but rest assured that we carefully review each message we receive. Your satisfaction is our top priority, and we strive to provide you with a complete and accurate response.<br><br>
                            If you have any additional information or details to add, please do not hesitate to share them with us. This will help us better understand your request and provide you with appropriate assistance.<br><br>
                            Thank you again for contacting us and we assure you that we will do our utmost to provide you with a response as soon as possible.<br><br>
                            Kind regards,<br>
                            Docxtalk";

            $mail->send();

            return 'success';
        } catch (Exception $e) {
            return "Message could not be sent. Mailer Error: " . $mail->ErrorInfo;
        }
    }
}
