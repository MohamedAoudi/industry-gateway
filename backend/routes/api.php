<?php

use App\Http\Controllers\AICompanieController;
use App\Http\Controllers\AIResearcherController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CentersExcellenceArtificialIntelligenceController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\FaqQuestionController;
use App\Http\Controllers\IndustrialPropertyPatentOfficesController;
use App\Http\Controllers\MediaItemController;
use App\Http\Controllers\MinistriesHigherEducationScientificResearchController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PaysController;
use App\Http\Controllers\PortalStatsController;
use App\Http\Controllers\registerCompanyController;
use App\Http\Controllers\registerResearcherController;
use App\Http\Controllers\ResearchDatabaseEntryController;
use App\Http\Controllers\ResearcherController;
use App\Http\Controllers\ScientificResearchInnovationCentersController;
use App\Http\Controllers\SiteSearchController;
use App\Http\Controllers\SupportingBodiesScientificResearchController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/pays', [PaysController::class, 'index']);
Route::get('/portal-stats', [PortalStatsController::class, 'index']);
Route::get('/faqs', [FaqQuestionController::class, 'index']);
Route::post('/faqs', [FaqQuestionController::class, 'store']);
Route::get('/research-database', [ResearchDatabaseEntryController::class, 'index']);
Route::get('/media-items', [MediaItemController::class, 'index']);
Route::get('/media-items/{mediaItem}/pdf', [MediaItemController::class, 'showPublishedPdf'])->name('media-items.pdf');
Route::get('/media-items/{mediaItem}/pdf-thumbnail', [MediaItemController::class, 'showPublishedPdfThumbnail'])->name('media-items.pdf-thumbnail');
Route::get('/site-search', [SiteSearchController::class, 'index']);

Route::get('/scientificResearchInnovationCenters', [ScientificResearchInnovationCentersController::class, 'index']);

Route::get('/centersExcellenceArtificialIntelligence', [CentersExcellenceArtificialIntelligenceController::class, 'index']);

Route::get('/ministriesHigherEducationScientificResearch', [MinistriesHigherEducationScientificResearchController::class, 'index']);

Route::get('/industrialPropertyPatentOffices', [IndustrialPropertyPatentOfficesController::class, 'index']);

Route::get('/supportingBodiesScientificResearch', [SupportingBodiesScientificResearchController::class, 'index']);

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

Route::post('/researchers/import-ai', [AIResearcherController::class, 'import']);
Route::post('/companies/import-ai', [AICompanieController::class, 'importCompanie']);

// Routes privées (Nécessitent un Token valide dans le Header)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/admin/users', [UserManagementController::class, 'index']);
    Route::post('/admin/users', [UserManagementController::class, 'store']);
    Route::put('/admin/users/{user}', [UserManagementController::class, 'update']);
    Route::delete('/admin/users/{user}', [UserManagementController::class, 'destroy']);

    Route::get('/media-items/admin', [MediaItemController::class, 'adminIndex']);
    Route::get('/media-items/{mediaItem}/pdf/admin', [MediaItemController::class, 'showAdminPdf']);
    Route::get('/media-items/{mediaItem}/pdf-thumbnail/admin', [MediaItemController::class, 'showAdminPdfThumbnail']);
    Route::post('/media-items', [MediaItemController::class, 'store']);
    Route::post('/media-items/{mediaItem}', [MediaItemController::class, 'update']);
    Route::delete('/media-items/{mediaItem}', [MediaItemController::class, 'destroy']);

    Route::get('/research-database/admin', [ResearchDatabaseEntryController::class, 'adminIndex']);
    Route::post('/research-database', [ResearchDatabaseEntryController::class, 'store']);
    Route::match(['put', 'patch', 'post'], '/research-database/{researchDatabaseEntry}', [ResearchDatabaseEntryController::class, 'update']);
    Route::delete('/research-database/{researchDatabaseEntry}', [ResearchDatabaseEntryController::class, 'destroy']);

    Route::put('/researchers/{id}', [ResearcherController::class, 'update']);
    Route::delete('/researchers/{id}', [ResearcherController::class, 'destroy']);
    Route::put('/companies/{id}', [CompanyController::class, 'update']);

    Route::post('/scientificResearchInnovationCenters', [ScientificResearchInnovationCentersController::class, 'store']);
    Route::match(['put', 'patch', 'post'], '/scientificResearchInnovationCenters/{id}', [ScientificResearchInnovationCentersController::class, 'update']);
    Route::delete('/scientificResearchInnovationCenters/{id}', [ScientificResearchInnovationCentersController::class, 'destroy']);

    Route::post('/centersExcellenceArtificialIntelligence', [CentersExcellenceArtificialIntelligenceController::class, 'store']);
    Route::match(['put', 'patch', 'post'], '/centersExcellenceArtificialIntelligence/{id}', [CentersExcellenceArtificialIntelligenceController::class, 'update']);
    Route::delete('/centersExcellenceArtificialIntelligence/{id}', [CentersExcellenceArtificialIntelligenceController::class, 'destroy']);

    Route::post('/ministriesHigherEducationScientificResearch', [MinistriesHigherEducationScientificResearchController::class, 'store']);
    Route::match(['put', 'patch', 'post'], '/ministriesHigherEducationScientificResearch/{id}', [MinistriesHigherEducationScientificResearchController::class, 'update']);
    Route::delete('/ministriesHigherEducationScientificResearch/{id}', [MinistriesHigherEducationScientificResearchController::class, 'destroy']);

    Route::post('/industrialPropertyPatentOffices', [IndustrialPropertyPatentOfficesController::class, 'store']);
    Route::match(['put', 'patch', 'post'], '/industrialPropertyPatentOffices/{id}', [IndustrialPropertyPatentOfficesController::class, 'update']);
    Route::delete('/industrialPropertyPatentOffices/{id}', [IndustrialPropertyPatentOfficesController::class, 'destroy']);

    Route::post('/supportingBodiesScientificResearch', [SupportingBodiesScientificResearchController::class, 'store']);
    Route::match(['put', 'patch', 'post'], '/supportingBodiesScientificResearch/{id}', [SupportingBodiesScientificResearchController::class, 'update']);
    Route::delete('/supportingBodiesScientificResearch/{id}', [SupportingBodiesScientificResearchController::class, 'destroy']);

    Route::get('/faqs/admin', [FaqQuestionController::class, 'adminIndex']);
    Route::match(['put', 'patch', 'post'], '/faqs/{id}', [FaqQuestionController::class, 'update']);
    Route::delete('/faqs/{id}', [FaqQuestionController::class, 'destroy']);

    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
