# Full Stack Authentication Application

## 📌 Overview
This project is a full-stack authentication system built as part of an internship task.  
It demonstrates secure user authentication, relational database design, and a clean React-based UI.

---

## 🛠️ Tech Stack
- **Frontend:** React JS, Tailwind CSS
- **Backend:** CodeIgniter 4 (PHP)
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)

---

## 🚀 Features
- User Registration (data stored across two related tables)
- Secure Login with password hashing
- JWT-based authentication
- Protected API routes
- Dashboard after login
- Users & Teachers data tables
- Search functionality in tables
- Responsive and minimal UI

---

## 🗂️ Project Structure
```
project-root/
├── backend/          # CodeIgniter 4 API
├── frontend/         # React Application
├── database/
│   └── database.sql  # Database export file
└── README.md         # Project documentation
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup (CodeIgniter)
```bash
cd backend
composer install
cp env .env   # configure DB inside .env
php spark serve
```

Backend will run at:
http://localhost:8080

---

### 🔹 Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

Frontend will run at:
http://localhost:3000

---

### 🔹 Database Setup
1. Open phpMyAdmin or MySQL client
2. Create a new database (e.g., auth_app)
3. Import:
```
database/database.sql
```

---

## 🔐 Authentication Flow
1. User registers → data saved in `auth_user` and `teachers`
2. User logs in → receives JWT token
3. Token stored in localStorage
4. Protected routes use `Authorization: Bearer <token>`

---

## 📊 API Endpoints

### 🔹 Auth
- `POST /register` → Register new user
- `POST /login` → Login and receive token

### 🔹 Protected
- `GET /dashboard` → Access dashboard
- `GET /users` → Fetch users list
- `GET /teachers` → Fetch teachers list

---

## 🧩 Database Design

### auth_user
- id (Primary Key)
- email
- first_name
- last_name
- password

### teachers
- id (Primary Key)
- user_id (Foreign Key)
- university_name
- gender
- year_joined

👉 One-to-One relationship between tables

---

## 🎨 UI Highlights
- Minimal and clean design
- Loading states
- Error handling
- Search functionality
- Responsive layout using Tailwind CSS

---

## 🎯 Task Completion
All requirements from the internship task have been successfully implemented:
- CodeIgniter backend ✔
- Auth APIs ✔
- JWT authentication ✔
- Relational database ✔
- Single API for dual table insert ✔
- React frontend ✔
- Data tables ✔

---

## 👨‍💻 Author
Atharv Lokhande
