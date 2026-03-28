<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// ✅ Handle CORS preflight FIRST
$routes->options('(:any)', function () {
    return service('response')->setStatusCode(200);
});

// ✅ Auth routes
$routes->post('register', 'Auth::register');
$routes->post('login', 'Auth::login');

// ✅ Protected route
$routes->get('dashboard', 'Auth::dashboard', ['filter' => 'auth']);

$routes->get('users', 'Auth::users', ['filter' => 'auth']);
$routes->get('teachers', 'Auth::teachers', ['filter' => 'auth']);