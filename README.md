# 🚀 Full Stack Authentication Application

## 📌 Overview
This project is a full-stack authentication system developed as part of an internship task.  
It demonstrates secure authentication, relational database design, RESTful API development, and a clean, user-friendly React interface.

---

## 🛠️ Tech Stack
- **Frontend:** React JS, Tailwind CSS
- **Backend:** CodeIgniter 4 (PHP)
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)

---

## ✨ Key Features
- 🔐 User Registration & Login
- 🔑 Secure password hashing
- 🛡️ JWT-based authentication
- 🚫 Protected API routes
- 📊 Dashboard after login
- 📋 Users & Teachers data tables
- 🔍 Search functionality
- ⚡ Loading & error handling
- 📱 Responsive & clean UI

---

## 🗂️ Project Structure
project-root/
├── backend/          # CodeIgniter 4 REST API
├── frontend/         # React Application
├── database/
│   └── database.sql  # Database export file
└── README.md         # Documentation

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup (CodeIgniter 4)
cd backend  
composer install  
cp env .env  
php spark serve  

Backend URL: http://localhost:8080

---

### 🔹 Frontend Setup (React)
cd frontend  
npm install  
npm start  

Frontend URL: http://localhost:3000

---

### 🔹 Database Setup
1. Open phpMyAdmin / MySQL Workbench  
2. Create a database (e.g., auth_app)  
3. Import: database/database.sql  

---

## 🔐 Authentication Workflow
1. User registers → data stored in auth_user & teachers  
2. User logs in → receives JWT token  
3. Token stored in localStorage  
4. Used in headers: Authorization: Bearer <token>  

---

## 📡 API Endpoints

### 🔹 Authentication APIs
- POST /register  
- POST /login  

### 🔹 Protected APIs
- GET /dashboard  
- GET /users  
- GET /teachers  

---

## 🧩 Database Design

### auth_user
- id  
- email  
- first_name  
- last_name  
- password  

### teachers
- id  
- user_id  
- university_name  
- gender  
- year_joined  

👉 One-to-One relationship

---

## 🎨 UI Highlights
- Minimal and modern design  
- Smooth UX  
- Loading states  
- Search functionality  
- Responsive layout  

---

## 🎯 Task Completion
✔ Backend (CodeIgniter)  
✔ Auth APIs  
✔ JWT authentication  
✔ Relational DB  
✔ Single API (dual insert)  
✔ React frontend  
✔ Data tables  

---

## 👨‍💻 Author
Atharv Lokhande
