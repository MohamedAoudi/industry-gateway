<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Symfony\Component\Process\Process;

class RunResearchersPythonJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle(): void
    {
        $scriptPath = base_path('scripts/chercheur.py');
        $python = $this->resolvePythonBinary();

        $process = new Process([$python, $scriptPath]);
        $process->setEnv(array_merge($process->getEnv() ?? [], ['PYTHONIOENCODING' => 'utf-8']));
        $process->setTimeout(null);
        $process->setIdleTimeout(null);
        $process->run();

        $output = trim($process->getOutput());
        $errorOutput = trim($process->getErrorOutput());

        $logMessage = "[" . now() . "] Using Python binary: $python\n";
        $logMessage .= "[" . now() . "] Command: $python $scriptPath\n";
        $logMessage .= $output ? "OUTPUT:\n$output\n" : "";
        $logMessage .= $errorOutput ? "ERROR:\n$errorOutput\n" : "";
        $logMessage .= "EXIT CODE: " . $process->getExitCode() . "\n\n";

        file_put_contents(storage_path('logs/python.log'), $logMessage, FILE_APPEND);

        if (! $process->isSuccessful()) {
            throw new \RuntimeException("Python script failed with exit code " . $process->getExitCode());
        }
    }

    protected function resolvePythonBinary(): string
    {
        $python = env('PYTHON_BINARY');
        if ($python) {
            return $python;
        }

        $candidates = [
            base_path('venv/bin/python3'),
            base_path('venv/bin/python'),
            '/usr/bin/python3',
            '/usr/bin/python',
        ];

        foreach ($candidates as $candidate) {
            if (file_exists($candidate)) {
                return $candidate;
            }
        }

        return 'python3';
    }
}
