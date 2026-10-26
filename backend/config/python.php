<?php

return [
    'env' => [
        'OPENAI_API_KEY' => env('OPENAI_API_KEY'),
        'SERPER_API_KEY' => env('SERPER_API_KEY'),
        'DB_HOST' => env('DB_HOST', '127.0.0.1'),
        'DB_USERNAME' => env('DB_USERNAME', 'root'),
        'DB_PASSWORD' => env('DB_PASSWORD', ''),
        'DB_DATABASE' => env('DB_DATABASE', 'platform_industry'),
        'PYTHONIOENCODING' => 'utf-8',
    ],
];
