<?php

namespace App\Models;

use CodeIgniter\Model;

class TeacherModel extends Model
{
    protected $table = 'teachers';
    protected $primaryKey = 'id';

    protected $returnType = 'array'; // ✅ important

    protected $allowedFields = [
        'user_id',
        'university_name',
        'gender',
        'year_joined'
    ];

    protected $useTimestamps = false;

    // ✅ Validation (optional but useful)
    protected $validationRules = [
        'user_id' => 'required|integer',
        'university_name' => 'required',
        'gender' => 'required',
        'year_joined' => 'required|integer'
    ];
}