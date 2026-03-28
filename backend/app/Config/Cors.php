<?php 

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    public array $default = [

        // ✅ MUST be specific (NOT '*')
        'allowedOrigins' => [
            'http://localhost:3000',
            'http://127.0.0.1:3000'
        ],

        'allowedOriginsPatterns' => [],

        // ❌ keep FALSE unless using cookies/session
        'supportsCredentials' => false,

        // ❌ DO NOT USE '*'
        'allowedHeaders' => [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
        ],

        'exposedHeaders' => [],

        'allowedMethods' => [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'OPTIONS',
        ],

        'maxAge' => 7200,
    ];
}