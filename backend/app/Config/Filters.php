<?php

namespace Config;

use CodeIgniter\Config\Filters as BaseFilters;
use CodeIgniter\Filters\Cors;
use CodeIgniter\Filters\ForceHTTPS;
use CodeIgniter\Filters\PageCache; // ✅ ADD THIS
use CodeIgniter\Filters\PerformanceMetrics; // ✅ ADD THIS
use CodeIgniter\Filters\DebugToolbar;

class Filters extends BaseFilters
{
    public array $aliases = [
        'cors'        => Cors::class,
        'toolbar'     => DebugToolbar::class,
        'forcehttps'  => ForceHTTPS::class,
        'pagecache'   => PageCache::class,        // ✅ FIX
        'performance' => PerformanceMetrics::class, // ✅ FIX
        'auth'        => \App\Filters\AuthFilter::class,
    ];

    public array $required = [
        'before' => [
            // ❌ disable for localhost
            // 'forcehttps',
            // 'pagecache',
        ],
        'after' => [
            'performance',
            'toolbar',
        ],
    ];

    public array $globals = [
        'before' => [
            'cors', // ✅ IMPORTANT
        ],
        'after' => [],
    ];

    public array $methods = [];

    public array $filters = [
        'auth' => ['before' => ['dashboard']],
    ];
}