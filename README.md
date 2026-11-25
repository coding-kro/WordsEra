# ✍️ WordsEra – Full-Stack Blogging Platform

**WordsEra** is a full-stack blogging platform built using the MERN stack that provides users with a simple and intuitive way to create, manage, and publish blog content.

The project focuses on providing a smooth content management experience while demonstrating practical full-stack development concepts, including REST API development, authentication, database management, and image uploads.

🌐 **Live Demo:** [WordsEra](https://words-era.vercel.app/)

📂 **GitHub Repository:** [WordsEra](https://github.com/coding-kro/WordsEra)

---

## 📌 Project Overview

WordsEra is designed for users who want to create and manage their written content through a dedicated blogging platform.

The application connects a React-based frontend with a Node.js and Express.js backend, using MongoDB for data storage and Cloudinary for image management.

It demonstrates how frontend and backend technologies work together to build a complete web application.

## 📸 Screenshots

<table>
  <tr>
    <td width="50%">
      <img width="1522" height="742" alt="image" src="https://github.com/user-attachments/assets/d4f8c03e-b942-4526-b5eb-8570eddad6ca" width="100%"  />
    </td>
    <td width="50%">
      <img width="1516" height="742" alt="image" src="https://github.com/user-attachments/assets/ed0bc1e8-a327-40e4-93b4-b84734c8847b" width="100%"  />
    </td>
  </tr>
  <tr>
    <td width="50%">
     <img width="1522" height="746" alt="image" src="https://github.com/user-attachments/assets/41458a08-648d-4223-9032-9838808cf391" width="100%"  />
    </td>
    <td width="50%">
      <img width="1516" height="782" alt="image" src="https://github.com/user-attachments/assets/623bfa1a-ce15-412b-934d-76c37fdb3559" width="100%"  />
    </td>
  </tr>
</table>

## ✨ Key Features

- **Blog Creation:** Create and publish blog posts.
- **Content Management:** Manage and edit existing blog content.
- **Blog Publishing:** Publish content through the blogging platform.
- **User Authentication:** Secure authentication using JSON Web Tokens (JWT).
- **Image Management:** Upload and manage images using Cloudinary.
- **RESTful APIs:** Backend APIs for communication between frontend and backend.
- **Responsive UI:** Interface designed to work across different screen sizes.
- **Database Management:** Store and manage application data using MongoDB.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- REST APIs
- JSON Web Token (JWT)

### Database & Storage
- MongoDB
- Mongoose
- Cloudinary

### Tools & Deployment
- Git & GitHub
- Vercel
- VS Code

## 🏗️ Application Architecture

WordsEra follows a client-server architecture.

```text
              ┌─────────────────────┐
              │      Frontend       │
              │                     │
              │   React.js          │
              │   Tailwind CSS      │
              └──────────┬──────────┘
                         │
                         │ HTTP Requests
                         ▼
              ┌─────────────────────┐
              │      Backend       │
              │                     │
              │   Node.js           │
              │   Express.js        │
              │   REST APIs         │
              └──────────┬──────────┘
                         │
               ┌─────────┴─────────┐
               ▼                   ▼
       ┌──────────────┐    ┌──────────────┐
       │   MongoDB    │    │  Cloudinary  │
       │              │    │              │
       │ Application  │    │ Image        │
       │ Data         │    │ Management   │
       └──────────────┘    └──────────────┘
```

## ⚙️ Getting Started

Follow these steps to run WordsEra locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/coding-kro/WordsEra.git
```

```bash
cd WordsEra
```

### 2. Install Dependencies

Install dependencies in both frontend and backend directories.

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in your backend directory and configure the required environment variables.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Add any additional environment variables required by your project.

### 4. Run the Backend

```bash
cd backend
npm run dev
```

### 5. Run the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The application will be available at the local development URL provided by Vite.

*Note: Update the directory names, environment variable names, and npm scripts if your repository uses different configurations.*

## 📚 What I Learned

While developing WordsEra, I gained practical experience with:

- Building full-stack applications using the MERN stack.
- Developing RESTful APIs with Express.js.
- Implementing JWT-based authentication.
- Connecting React applications with backend APIs.
- Managing application data using MongoDB and Mongoose.
- Integrating Cloudinary for image uploads.
- Structuring frontend and backend code for maintainability.
- Deploying full-stack applications.

## 🚀 Future Improvements

Some improvements that could make WordsEra even better:

- Blog search and filtering.
- Categories and tags.
- Like and comment functionality.
- Rich text editor for blog creation.
- User profiles and author pages.
- Pagination and improved content discovery.

## 👨‍💻 Developer

**Mohit Kumar**

MERN Stack Developer | Full-Stack Web Developer

- GitHub: [@coding-kro](https://github.com/coding-kro)
- LinkedIn: [Mohit Kumar](https://www.linkedin.com/in/mohit-kumar16)
- Portfolio: [My Portfolio](https://mohit-portfolio-blue-eight.vercel.app/)

---

⭐ If you find this project interesting, consider giving the repository a star!

**Built with ❤️ by Mohit Kumar**
