<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UrlPdfController;
use App\Http\Controllers\ObjetDocumentController;
use App\Http\Controllers\UserPdfController;
use App\Http\Controllers\PdfGeneratorController;
use App\Http\Controllers\UserDocumentController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/movies', [MovieController::class, 'index']);
Route::post('/create-movie', [MovieController::class, 'store']);

Route::post('/objet-document', [ObjetDocumentController::class, 'store']);

Route::post('/fileusers', [UserPdfController::class, 'upload']);

Route::post('/convert-url-to-pdf', [UrlPdfController::class, 'convert']);
Route::get('/pdfs', [UrlPdfController::class, 'index'])->name('pdfs.index');


// stocker les donnees json dans le tableau json
Route::post('/user-documents', [UserDocumentController::class, 'store']);
// retourner les donnees json dans le tableau en fonction de l'objet du document
Route::get('/documents/{key}', [UserDocumentController::class, 'show'])->name('documents.show');
Route::get('/create-context', [UserDocumentController::class, 'createContext'])->name('documents.createContext');


// Route::get('/generate-pdf/{documentId}', [PdfGeneratorController::class, 'generatePdf']);
Route::get('/lettre-licenciement', [PdfGeneratorController::class, 'showLettreLicenciement'])->name('lettre.licenciement');
Route::get('/lettre-licenciement', [PdfGeneratorController::class, 'generatePDFFromFinalPdfUser']);

Route::get('/generate-pdf/{id}', [PdfGeneratorController::class, 'getCorrectedJson']);
Route::get('/cleaned-json', [PdfGeneratorController::class, 'generatePDF']);
