<div align="center">

# 🌐 NetworX — Professional Networking Platform

**NetworX** is a full-stack professional networking application inspired by platforms like LinkedIn. It enables users to create professional profiles, share updates, interact with posts, and connect with other users.

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white)


### 🔗 Project Links

🌍 **[Live Application](https://networx-frontend.vercel.app/)**

💻 **[Frontend Repository](https://github.com/amanbansal1506/networx-frontend)**

⚙️ **[Backend Repository](https://github.com/amanbansal1506/networx-backend)**

---
</div>

## 📖 Project Overview

NetworX is designed to provide a simple and interactive professional networking experience.

The application allows users to build their professional identity, share posts, engage with other users, and manage professional connections.

The project follows a client-server architecture, with a Next.js frontend communicating with a RESTful backend built using Express.js and PostgreSQL.

### Project Objectives

- Develop a functional full-stack web application.
- Implement secure user authentication.
- Design and integrate RESTful APIs.
- Manage relational data using PostgreSQL.
- Build a responsive, reusable frontend.
- Deploy the application using cloud hosting services.

---

## ✨ Features

### 🔐 User Authentication

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Cookie-based session management
- Protected application routes
- User logout

### 👤 Professional Profiles

- View and update profile information
- Add professional headlines and biographies
- Manage skills
- Add educational qualifications
- Add work experience
- View other users' profiles

### 📝 Posts and Feed

- Create and publish text posts
- Browse posts on the homepage
- Like and unlike posts
- Comment on posts
- Interact with content shared by other users

### 🤝 Professional Networking

- Discover registered users
- Send connection requests
- Accept or reject connection requests
- Manage professional connections
- View network activity

### 🔔 Notifications

- View notifications related to account activity
- Track networking interactions
- Manage notification status

### 🔎 User Search

- Search for users
- Discover professional profiles
- Navigate to user profile pages

### 📱 Responsive Interface

- Clean and minimal user interface
- Desktop and mobile-friendly layouts
- Reusable React components
- Consistent navigation

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React.js |
| Programming Language | JavaScript |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Authentication | JWT, bcrypt, HTTP Cookies |
| Database Hosting | Neon |
| Backend Deployment | Render |
| Frontend Deployment | Vercel |
| Version Control | Git, GitHub |

---

## 🏗️ System Architecture

```text
            User / Web Browser
                    |
                    v
          Next.js + React Frontend
                 (Vercel)
                    |
                    | REST API Requests
                    v
           Node.js + Express.js
                 (Render)
                    |
                    | SQL Queries
                    v
             PostgreSQL Database
                   (Neon)
```

### How It Works

1. The user interacts with the Next.js frontend.
2. The frontend communicates with the Express.js backend through API requests.
3. The backend validates requests and executes application logic.
4. PostgreSQL stores user information, posts, comments, and connections.
5. The backend returns responses that are displayed in the frontend.

Authentication uses JWT tokens stored in cookies.

---

## 📁 Project Structure

The project is organized into two separate repositories.

### Frontend

```text
networx-frontend/
│
├── app/
│   ├── sign-in/
│   ├── sign-up/
│   ├── (dashboard)/
│   │   ├── home/
│   │   ├── profile/
│   │   ├── mynetwork/
│   │   ├── search/
│   │   └── notifications/
│   ├── layout.jsx
│   └── globals.css
│
├── components/
├── context/
├── lib/
├── public/
├── package.json
└── next.config.mjs
```

### Backend

```text
networx-backend/
│
├── routes/
├── middleware/
├── db/
├── scripts/
├── utils/
├── test/
│
├── app.js
├── server.js
├── package.json
└── docker-compose.yml
```

The frontend uses reusable React components, while the backend separates API routes, middleware, database operations, and utility functions.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js (version 20 or later)
- npm
- PostgreSQL
- Git

### 1. Clone the repositories

**Frontend:**

```bash
git clone https://github.com/amanbansal1506/networx-frontend.git
```

**Backend:**

```bash
git clone https://github.com/amanbansal1506/networx-backend.git
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd networx-backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_jwt_secret_minimum_32_characters
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=8000
```

Initialize the PostgreSQL database:

```bash
npm run repair
```

Start the backend:

```bash
npm run dev
```

The backend runs at:

`http://localhost:8000`

Health check:

`http://localhost:8000/health`

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd networx-frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_HOST_IP=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Open:

`http://localhost:3000`

**Note:** Never commit database passwords, JWT secrets, or environment files containing credentials to GitHub.

---

## ☁️ Deployment

NetworX is deployed using a three-service architecture.

| Service | Purpose |
|---|---|
| Vercel | Hosts the Next.js frontend |
| Render | Hosts the Node.js/Express API |
| Neon | Provides managed PostgreSQL hosting |

### Live Application

**https://networx-frontend.vercel.app/**

Production configuration uses environment variables and HTTPS. Authentication requests must be configured to handle cookies correctly across browsers; a same-origin API proxy can be used to avoid third-party cookie restrictions.

---

## 🔒 Security

The application uses several authentication and security practices:

- Password hashing using bcrypt
- JWT-based authorization
- Authentication middleware for protected routes
- Cookie-based authentication
- Environment variables for sensitive configuration
- Server-side input validation

NetworX is primarily a learning and portfolio project and is not presented as a production-hardened commercial service.

---

## 📈 Future Enhancements

The following features are planned for future development:

- [ ] Upload and update profile pictures
- [ ] Add images to posts
- [ ] Direct messaging between connected users
- [ ] Jobs and opportunities module
- [ ] Additional profile customization
- [ ] Improved user experience and accessibility

Messaging and Jobs currently have placeholder pages rather than fully implemented backend functionality.

---

## 💡 Key Learnings

Developing NetworX provided hands-on experience with:

- Building full-stack applications using JavaScript
- Implementing RESTful API communication
- Managing authentication and authorization
- Designing and querying relational databases
- Creating reusable frontend components
- Handling API errors and debugging backend issues
- Managing database schema changes
- Deploying applications to cloud platforms
- Resolving cross-domain authentication and cookie issues

The project strengthened my understanding of how frontend applications, backend services, and databases work together.

---

## 👨‍💻 Author

**Aman Bansal**

Software Developer | Full-Stack Development Enthusiast

**GitHub:** [github.com/amanbansal1506](https://github.com/amanbansal1506)

**Live Project:** [NetworX](https://networx-frontend.vercel.app/)

---

### ⭐ Support

If you find this project interesting, consider giving the repository a star!

*Built as a personal full-stack development and learning project.*
