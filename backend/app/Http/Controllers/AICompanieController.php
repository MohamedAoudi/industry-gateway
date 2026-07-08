<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\RunCompaniesPythonJob;

class AICompanieController extends Controller
{
    public function importCompanie()
    {
        RunCompaniesPythonJob::dispatch();

        return response()->json([
            'message' => '🚀 AI scraping started in background queue'
        ]);
    }
}
