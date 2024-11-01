<?php

namespace App\Services;

use Ilovepdf\Ilovepdf;

class PdfService
{
    protected $ilovepdf;

    public function __construct()
    {
        $this->ilovepdf = new Ilovepdf(config('services.ilovepdf.public_key'), config('services.ilovepdf.secret_key'));
    }

    public function mergePdfs($pdfFiles)
    {
        // Commencer la tâche de fusion
        $task = $this->ilovepdf->newTask('merge');

        // Ajouter les fichiers PDF à fusionner
        foreach ($pdfFiles as $pdfFile) {
            $task->addFile($pdfFile);
        }

        // Processus de fusion des fichiers
        $task->process();

        // Télécharger le fichier fusionné
        $outputFilePath = storage_path('app/merged_output.pdf');
        $task->download($outputFilePath);

        return $outputFilePath;
    }
}
