<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\FaqQuestionController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/faq', 'faq')->name('faq');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('admin/faq', 'faq-admin')->name('admin.faq');

    Route::get('admin/faqs', [FaqQuestionController::class, 'adminIndex'])->name('admin.faqs.index');
    Route::post('admin/faqs/{id}', [FaqQuestionController::class, 'update'])->name('admin.faqs.update');
    Route::delete('admin/faqs/{id}', [FaqQuestionController::class, 'destroy'])->name('admin.faqs.destroy');
});

require __DIR__.'/settings.php';
