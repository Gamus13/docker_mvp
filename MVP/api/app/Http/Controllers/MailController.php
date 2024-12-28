<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;
use Carbon\Carbon;

class MailController extends Controller
{
    // public function sendEmail(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email',
    //         'message' => 'required|string',
    //         'file' => 'required|file|mimes:pdf,jpg,png', // Vérifie le type de fichier
    //     ]);

    //     // Traitement du fichier
    //     $filePath = $request->file('file')->store('attachments'); // Enregistrer le fichier dans le dossier 'storage/app/attachments'

    //     $mailData = [
    //         'title' => 'Mail from ' . $request->name,
    //         'body' => $request->message,
    //         'files' => [
    //             storage_path('app/' . $filePath), // Chemin du fichier stocké
    //         ]
    //     ];

    //     Mail::to($request->email)->send(new DemoMail($mailData));

    //     return response()->json(['message' => 'Email sent successfully!']);
    // }

    // public function sendEmail(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email',
    //         'message' => 'required|string',
    //         'file' => 'required|file|mimes:pdf,jpg,png', // Vérifie le type de fichier
    //     ]);

    //     // Traitement du fichier et stockage dans 'attachments' sur le disque public
    //     $filePath = $request->file('file')->store('attachments', 'public');

    //     $mailData = [
    //         'title' => 'Mail from ' . $request->name,
    //         'body' => $request->message,
    //         'files' => [
    //             storage_path('app/public/' . $filePath), // Chemin du fichier stocké
    //         ]
    //     ];

    //     Mail::to($request->email)->send(new DemoMail($mailData));

    //     return response()->json(['message' => 'Email sent successfully!']);
    // }

    public function sendEmail(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
            'file_path' => 'required|string', // Attendez un chemin
        ]);

        $filePath = public_path('storage/' . $request->file_path); // Chemin absolu vers le fichier

        // Vérifier si le fichier existe
        if (!file_exists($filePath)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        $mailData = [
            'title' => 'Mail from ' . $request->name,
            'body' => $request->message,
            'files' => [
                $filePath, // Ajouter le fichier comme pièce jointe
            ],
        ];

        Mail::to($request->email)->send(new DemoMail($mailData));

        return response()->json(['message' => 'Email sent successfully!']);
    }

    // public function queueEmail(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email',
    //         'message' => 'required|string',
    //     ]);

    //     $mailData = [
    //         'title' => 'Delayed Email from ' . $request->name,
    //         'body' => $request->message,
    //     ];

    //     // Ajouter un délai de 15 minutes
    //     $delay = Carbon::now()->addMinutes(15);

    //     // Programmer l'email pour qu'il soit envoyé après 15 minutes
    //     Mail::to($request->email)->later($delay, new DemoMail($mailData));

    //     return response()->json(['message' => 'Email queued and will be sent in 15 minutes.']);
    // }

    public function queueEmail(Request $request)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|string|max:255',
            'emails' => 'required|array|min:1', // Doit être un tableau avec au moins une adresse email
            'emails.*' => 'email', // Chaque élément du tableau doit être un email valide
            'message' => 'required|string',
        ]);

        $mailData = [
            'title' => 'Delayed Email from ' . $request->name,
            'body' => $request->message,
        ];

        // Ajouter un délai de 15 minutes
        $delay = Carbon::now()->addMinutes(15);

        // Récupérer le tableau d'adresses email
        $emails = $request->input('emails');

        // Programmer l'email pour chaque adresse
        foreach ($emails as $email) {
            Mail::to($email)->later($delay, new DemoMail($mailData));
        }

        return response()->json(['message' => 'Emails queued and will be sent in 15 minutes.']);
    }


}
