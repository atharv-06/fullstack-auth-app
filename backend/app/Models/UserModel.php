<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'auth_user'; // ✅ make sure table name is correct
    protected $primaryKey = 'id';

    protected $returnType = 'array'; // ✅ important

    protected $allowedFields = [
        'email',
        'first_name',
        'last_name',
        'password'
    ];

    // ✅ Optional but recommended
    protected $useTimestamps = false;

    // ✅ Validation (good for avoiding errors)
    protected $validationRules = [
        'email' => 'required|valid_email',
        'password' => 'required|min_length[6]'
    ];
}