<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        
        // 1. Indispensable pour Sanctum SPA : gère les cookies de session pour l'API
        // $middleware->statefulApi();

        $middleware->encryptCookies(except: [
            'appearance', 
            'sidebar_state'
        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        
        // 2. Optionnel : Configurer le CORS pour autoriser les cookies du frontend
        // Laravel gère souvent cela via config/cors.php, mais on peut le renforcer ici.
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();