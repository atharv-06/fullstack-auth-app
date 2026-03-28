<?php

namespace App\Controllers;

use App\Models\UserModel;
use App\Models\TeacherModel;
use Firebase\JWT\JWT;

class Auth extends BaseController
{
    // ✅ TEST API
    public function test()
    {
        return $this->response->setJSON([
            "message" => "API working ✅"
        ]);
    }

    // ✅ REGISTER
    public function register()
    {
        try {
            $userModel = new UserModel();
            $teacherModel = new TeacherModel();

            $data = $this->request->getJSON(true);

            // ✅ Validate input
            if (!$data) {
                return $this->response->setJSON([
                    "status" => 400,
                    "message" => "Invalid input"
                ]);
            }

            if (
                !isset(
                    $data['email'],
                    $data['password'],
                    $data['first_name'],
                    $data['last_name'],
                    $data['university_name'],
                    $data['gender'],
                    $data['year_joined']
                )
            ) {
                return $this->response->setJSON([
                    "status" => 400,
                    "message" => "All fields are required"
                ]);
            }

            // ✅ Check if email exists
            if ($userModel->where('email', $data['email'])->first()) {
                return $this->response->setJSON([
                    "status" => 409,
                    "message" => "Email already exists"
                ]);
            }

            // ✅ Insert user
            $userId = $userModel->insert([
                'email'       => $data['email'],
                'first_name'  => $data['first_name'],
                'last_name'   => $data['last_name'],
                'password'    => password_hash($data['password'], PASSWORD_DEFAULT)
            ]);

            if (!$userId) {
                return $this->response->setJSON([
                    "status"  => 500,
                    "message" => "User insert failed",
                    "errors"  => $userModel->errors()
                ]);
            }

            // ✅ Insert teacher
            $teacher = $teacherModel->insert([
                'user_id'         => $userId,
                'university_name' => $data['university_name'],
                'gender'          => $data['gender'],
                'year_joined'     => (int) $data['year_joined']
            ]);

            if (!$teacher) {
                return $this->response->setJSON([
                    "status"  => 500,
                    "message" => "Teacher insert failed",
                    "errors"  => $teacherModel->errors()
                ]);
            }

            return $this->response->setJSON([
                "status"  => 200,
                "message" => "Registered successfully 🎉"
            ]);

        } catch (\Throwable $e) {
            return $this->response->setJSON([
                "status" => 500,
                "error"  => $e->getMessage()
            ]);
        }
    }

    // ✅ LOGIN
    public function login()
    {
        try {
            $userModel = new UserModel();
            $data = $this->request->getJSON(true);

            if (!$data || !isset($data['email'], $data['password'])) {
                return $this->response->setJSON([
                    "status"  => 400,
                    "message" => "Email and password required"
                ]);
            }

            $user = $userModel->where('email', $data['email'])->first();

            if (!$user) {
                return $this->response->setJSON([
                    "status"  => 401,
                    "message" => "User not found"
                ]);
            }

            if (!password_verify($data['password'], $user['password'])) {
                return $this->response->setJSON([
                    "status"  => 401,
                    "message" => "Wrong password"
                ]);
            }

            // ✅ JWT Token
            $key = env('JWT_SECRET') ?? "this_is_my_super_secret_key_123456";

            $payload = [
                "user_id" => $user['id'],
                "email"   => $user['email'],
                "iat"     => time()
            ];

            $token = JWT::encode($payload, $key, 'HS256');

            return $this->response->setJSON([
                "status" => 200,
                "token"  => $token
            ]);

        } catch (\Throwable $e) {
            return $this->response->setJSON([
                "status" => 500,
                "error"  => $e->getMessage()
            ]);
        }
    }

    // ✅ PROTECTED ROUTE
    public function dashboard()
    {
        return $this->response->setJSON([
            "message" => "Welcome! You are authenticated 🎉"
        ]);
    }

    public function users()
    {
        $userModel = new \App\Models\UserModel();

        $users = $userModel->findAll();

        return $this->response->setJSON($users);
    }

    public function teachers()
    {
        $teacherModel = new \App\Models\TeacherModel();

        $teachers = $teacherModel->findAll();

        return $this->response->setJSON($teachers);
    }
}