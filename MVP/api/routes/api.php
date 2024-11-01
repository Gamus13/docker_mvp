<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UrlPdfController;
use App\Http\Controllers\ObjetDocumentController;
use App\Http\Controllers\UserPdfController;
use App\Http\Controllers\PdfGeneratorController;
use App\Http\Controllers\GoogleLoginController;
use App\Http\Controllers\UserDocumentController;
use App\Http\Controllers\UserPdfGenerateController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MailSenderController;
use App\Http\Controllers\MailController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/movies', [MovieController::class, 'index']);
Route::post('/create-movie', [MovieController::class, 'store']);






Route::get('/pdfs', [UrlPdfController::class, 'index'])->name('pdfs.index');


// stocker les donnees json dans le tableau json
Route::post('/user-documents', [UserDocumentController::class, 'store']);
// retourner les donnees json dans le tableau en fonction de l'objet du document
Route::get('/documents/{key}', [UserDocumentController::class, 'show'])->name('documents.show');



// Route::get('/generate-pdf/{documentId}', [PdfGeneratorController::class, 'generatePdf']);
Route::get('/lettre-licenciement', [PdfGeneratorController::class, 'showLettreLicenciement'])->name('lettre.licenciement');
Route::get('/lettre-licenciement', [PdfGeneratorController::class, 'generatePDFFromFinalPdfUser']);


Route::get('/generate-pdf/{id}', [PdfGeneratorController::class, 'getCorrectedJson']);
Route::get('/cleaned-json', [PdfGeneratorController::class, 'generatePDF']);


Route::get('/google/redirect', [GoogleLoginController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/google/callback', [GoogleLoginController::class, 'handleGoogleCallback'])->name('google.callback');



// Route::post('/register', [AuthController::class, 'register'])->name('register');
// Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->middleware('web');
Route::post('/register', [AuthController::class, 'register'])->middleware('web');
Route::post('/google-login', [AuthController::class, 'handleGoogleLogin']);
Route::post('/send-email', [MailSenderController::class, 'sendEmail']);
Route::post('/send-emailcreate', [MailController::class, 'sendEmail']);
Route::post('/upload', [UserPdfGenerateController::class, 'upload']);
Route::get('/Userpdfs', [UserPdfGenerateController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/objet-document', [ObjetDocumentController::class, 'store']);
    Route::post('/convert-url-to-pdf', [UrlPdfController::class, 'convert']);
    Route::post('/fileusers', [UserPdfController::class, 'upload']);
    Route::get('/create-context', [UserDocumentController::class, 'createContext'])->name('documents.createContext');

    Route::get('/users/total', [AuthController::class, 'getTotalUsers']);
    Route::get('/users', [AuthController::class, 'getAllUsers']);


    Route::get('/pdfs', [PdfGeneratorController::class, 'index'])->name('pdfs.index');
    Route::get('/pdfsupdate', [PdfGeneratorController::class, 'indexupdate'])->name('pdfs.indexupdate');
    Route::get('/generate-pdfs/{userId}', [PdfGeneratorController::class, 'generateMultiplePdfsFromTemplates']);
    Route::post('/update-pdf/{userId}', [PdfGeneratorController::class, 'updateDocumentData']);
    Route::get('/updatedocuments/{key}', [PdfGeneratorController::class, 'show'])->name('updatedocuments.show');
});
