<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\registerResearcherController;
use App\Http\Controllers\registerCompanyController;
use App\Http\Controllers\OffersController;
use App\Http\Controllers\ResearcherController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\OfferController;






Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);
 
    return ['token' => $token->plainTextToken];
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/register-researcher', [registerResearcherController::class, 'registerResearcher']);
Route::post('/register-company', [registerCompanyController::class, 'registerCompany']);
Route::get('/researchers', [ResearcherController::class, 'index']);

Route::get('/companies', [CompanyController::class, 'index']);
Route::get('/companies/pending', [CompanyController::class, 'getPendingRequests']);
Route::put('/companies/{id}/status', [CompanyController::class, 'updateStatus']);
Route::delete('/companies/{id}', [CompanyController::class, 'destroy']);


Route::get('/offers', [OfferController::class, 'index']);
Route::post('/offers', [OfferController::class, 'store']);
Route::delete('/offers/{id}', [OfferController::class, 'destroy']);
Route::patch('/offers/{id}/status', [OfferController::class, 'updateStatus']);

// Routes privées (Nécessitent un Token valide dans le Header)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
