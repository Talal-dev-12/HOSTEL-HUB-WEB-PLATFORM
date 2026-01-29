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
HostelHub/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ ├── server.js
│ └── .env.example
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── api/
│ └── App.tsx
│
└── README.md


---

Environment Variables

Create a `.env` file in backend folder:

.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/HOSTEL-HUB-Platform
JWT_SECRET=your_secret_key

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Installation & Setup
Clone Repository
git clone https://github.com/yourusername/hostelhub.git
cd hostelhub

Backend Setup
cd backend
npm install
npm run dev


Server will run on:

http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:3000

Authentication Flow

User registers or logs in

Backend returns JWT token and user object

Token stored in localStorage

Navbar updates instantly using React state

Protected routes check token & role

Image Upload Flow (Cloudinary)

User selects multiple images

Images sent using FormData

Multer stores temp file

Cloudinary uploads image

Cloudinary returns secure URL

URL stored in MongoDB

Temp file deleted


Roles & Permissions

Role	Access
Student	View hostels
Hostler	Create hostels
Admin	Approve/reject hostels
API Endpoints (Main)
Auth
POST /api/auth/register
POST /api/auth/login

Hostel
POST /api/hostels/create (hostler)
GET /api/hostels/approved (student)
GET /api/hostels/my-hostels (hostler)
DELETE /api/hostels/:id
PUT /api/hostels/:id/badges

Security

JWT token validation middleware

Role-based middleware

Rate limiting for hostel listing

.env ignored from GitHub

node_modules ignored

Git Best Practices

.gitignore excludes:

node_modules

.env

uploads

.env.example provided

Clean commit history

Future Enhancements

Booking & payment gateway (Stripe/JazzCash)

Reviews & ratings

Chat system

Email notifications

Mobile app version

Admin analytics dashboard

Author

Developed by Talal Nadeem
Software Engineer

📜 License

This project is for educational and learning purposes.

If you like this project

Give it a star on GitHub 


