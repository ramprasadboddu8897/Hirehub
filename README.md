# 🚀 HireHub – Job Listing & Hiring Platform

**HireHub** is a full-stack MERN (MongoDB, Express.js, React, Node.js) application for job seekers and hiring teams. It offers secure registration/login, job filtering, personalized user profiles, and detailed job views.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Architecture](#backend-architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## ✅ Features

- 🔐 JWT-based Authentication (Login/Register)
- 🧑 Profile with gender-based avatars
- 💼 Dynamic job listing with filters:
  - Employment Type
  - Salary Range
  - Search by title or description
- 📄 Job Details view with:
  - Skills
  - Company Life Description & Image
  - Company Website link
- 🌐 Fully responsive UI (React functional & class components)
- ⚙️ Server-side MongoDB job seeding with dynamic skills

---

## ⚙️ Tech Stack

| Layer         | Technology                                |
|---------------|--------------------------------------------|
| Frontend      | React (v17), React Router DOM              |
| Styling       | CSS3 (custom modular styles)               |
| State         | Class/Functional Components with Hooks     |
| Authentication| JWT via Cookies (`js-cookie`)              |
| Backend       | Node.js, Express.js, Mongoose              |
| Database      | MongoDB Atlas or Local MongoDB             |
| Security      | bcryptjs, dotenv, CORS                     |
| Dev Tools     | Nodemon, Prettier, Husky (optional)        |

---

## 🏗️ Backend Architecture

``` bash

server/
├── controllers/
│   ├── authController.js        # Handles Register, Login, and Profile logic
│   └── jobController.js         # Handles Job Listing, Filtering, and Job Details
│
├── middleware/
│   └── verifyToken.js           # JWT Authentication Middleware
│
├── models/
│   ├── User.js                  # User login credentials schema
│   ├── UserProfile.js           # User profile information schema
│   └── Job.js                   # Job listing schema (with skills and life at company)
│
├── routes/
│   ├── auth.js                  # Routes for /register, /login, /profile
│   └── jobs.js                  # Routes for /jobs and /jobs/:id
│
├── jobsData.json                # Static seed file for inserting sample jobs
├── seedJobs.js                  # MongoDB Seeder Script
├── .env                         # Environment variables (e.g., DB URI, JWT secret)
└── index.js                     # Express App Entry Point

```
---

## 📁 Frontend Folder Structure

``` bash
client/
├── public/
│   └── index.html               # HTML template
│
├── src/
│   ├── components/
│   │   ├── Header/              # Navbar / App Header
│   │   ├── Login/               # Login Component
│   │   ├── Register/            # Register Component
│   │   ├── Jobs/                # Jobs Listing with Filters
│   │   └── JobDetails/          # Detailed Job View + Similar Jobs
│   │
│   ├── App.js                   # Main Router and App Component
│   └── index.js                 # ReactDOM Root Entry Point
│
├── package.json                 # Frontend Dependencies & Scripts
└── README.md                    # This file

```
---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env  # Create .env file
# Fill in MONGO_URI and JWT_SECRET
npm run seed           # Seed MongoDB with jobs
npm start              # Starts Express server on port 5000
```
###2. Frontend Setup

```bash
Copy
Edit
cd client
npm install
npm start              # Runs React app on http://localhost:3000
```

### 🌐 Environment Variables
In server/.env:

```bash
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/hirehub
JWT_SECRET=yourSuperSecretKey
```

### 🧪 Scripts
Command	Description
npm start	Run server (with nodemon)
npm run seed	Seed jobs data to MongoDB
npm run build	Build React app (production)

## 🙌 Contributing
Fork the repo

Create a feature branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Add: Your feature"

Push to your branch: git push origin feature/YourFeature

## Open a Pull Request 🚀

### 📄 License
This project is licensed under the MIT License.

Made with ❤️ by Ramprasad Boddu and Contributors
