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

        $command = "python3 " . base_path("scripts/chercheur.py");

        $output = shell_exec($command);

        $this->info($output);

        $this->info("✅ AI scraping finished.");

        return 0;
    }
}