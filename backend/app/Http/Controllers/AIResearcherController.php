<?php

namespace App\Http\Controllers;
use App\Jobs\RunResearchersPythonJob;

class AIResearcherController extends Controller
{
    public function import()
    {
        RunResearchersPythonJob::dispatch();

        return response()->json([
            'message' => '🚀 AI scraping started in background queue'
        ]);
    }
}