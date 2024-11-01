<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;

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

    public function sendEmail(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
            'file' => 'required|file|mimes:pdf,jpg,png', // Vérifie le type de fichier
        ]);

        // Traitement du fichier et stockage dans 'attachments' sur le disque public
        $filePath = $request->file('file')->store('attachments', 'public');

        $mailData = [
            'title' => 'Mail from ' . $request->name,
            'body' => $request->message,
            'files' => [
                storage_path('app/public/' . $filePath), // Chemin du fichier stocké
            ]
        ];

        Mail::to($request->email)->send(new DemoMail($mailData));

        return response()->json(['message' => 'Email sent successfully!']);
    }

}
