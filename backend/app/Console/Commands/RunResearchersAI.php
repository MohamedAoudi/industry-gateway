<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RunResearchersAI extends Command
{
    protected $signature = 'ai:researchers';
    protected $description = 'Run Python AI researchers scraper';

    public function handle()
    {
        $this->info("🚀 Starting Python AI scraper...");

        $process = new \Symfony\Component\Process\Process([
            env('PYTHON_BINARY', 'python3'), base_path('scripts/chercheur.py'),
        ]);
        $process->setEnv(array_filter(config('python.env'), static fn ($value) => $value !== null));
        $process->setTimeout(null);
        $process->mustRun();
        $output = $process->getOutput();

        $this->info($output);

        $this->info("✅ AI scraping finished.");

        return 0;
    }
}