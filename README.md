# 🏨 HostelHub Platform (Full Stack MERN Project)

HostelHub is a full-stack hostel rental platform built using **React, Node.js, Express, and MongoDB**.  
It connects **students/job holders** with **hostlers (hostel owners)** and includes an **admin panel** for approval and management.

This project supports:
- Authentication & Authorization (JWT)
- Role-based dashboards
- Hostel listing with image upload (Cloudinary)
- Admin approval system
- Secure APIs
- Production-ready structure

---

## 🚀 Features

### 👨‍🎓 Student
- Browse approved hostels
- View hostel details
- See amenities and images
- Contact hostler
- Secure booking flow (future scope)

### 🏢 Hostler
- Register and login
- Create hostel listings
- Upload multiple images (Cloudinary)
- Manage own hostels
- Purchase featured/verified badges
- Delete own hostels

### 🛡️ Admin
- Approve or reject hostels
- View all listings
- Control platform content

### 🔐 Authentication
- JWT based login/signup
- Protected routes
- Role-based access (student, hostler, admin)
- Token stored in localStorage

### 🖼️ Image Upload
- Multer for file handling
- Cloudinary for cloud image storage
- Database stores only image URLs

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Lucide Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer
- Cloudinary
- dotenv
- express-rate-limit


Connect your API_SECRETS and KEY in backend by creating file .env .env.example have template 
---

## 📂 Project Structure

