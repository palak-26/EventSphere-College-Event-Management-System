# 🎉 EventSphere – College Event Management System

EventSphere is a full-stack MERN application that streamlines college event management. It enables students, clubs, and administrators to interact on a unified platform for organizing, managing, and participating in events.

---

## 🚀 Features

### 👨‍🎓 Student

* Browse all approved events
* Register for events
* View upcoming & past events
* Download certificates
* Personalized dashboard

### 🏫 Club

* Create and manage events
* Upload event banners
* Track participants
* Update event status (Pending / Approved / Completed)
* View club dashboard

### 🛡️ Admin

* Approve / reject events
* Monitor all events
* Manage users and clubs
* View analytics

---

## 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Tools & Libraries

* Axios
* JWT Authentication
* Multer (Image Uploads)

---

## 📁 Project Structure

```
EventSphere-MajorProject/

├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── clubController.js
│   │   └── eventController.js
│   ├── middleware/
│   │   ├── roleAuth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Club.js
│   │   └── Certificate.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── users.js
│   │   ├── leaderboard.js
│   │   └── certificates.js
│   ├── uploads/
│   │   └── events/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── EventCard.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── ClubDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageEvents.jsx
│   │   │   ├── CreateEvent.jsx
│   │   │   ├── EditEvent.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── EventGallery.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── Certificates.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/palak-26/EventSphere-College-Event-Management-System.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### Project Screenshot
<img width="1900" height="923" alt="Screenshot 2025-11-19 123513" src="https://github.com/user-attachments/assets/e58e8d0e-adaa-452e-890a-f296f2478021" />
<img width="1900" height="929" alt="Screenshot 2025-11-19 123621" src="https://github.com/user-attachments/assets/edf14c9a-822e-4788-9278-03501200aa72" />
<img width="1901" height="924" alt="Screenshot 2025-11-19 124152" src="https://github.com/user-attachments/assets/0a02dadc-4dcd-4c4a-89ff-01168160a88c" />
<img width="1900" height="923" alt="Screenshot 2025-11-19 124332" src="https://github.com/user-attachments/assets/3ae62f4f-9997-4533-a5fe-d912dd3e4c21" />
<img width="1903" height="926" alt="Screenshot 2025-11-19 124317" src="https://github.com/user-attachments/assets/062f497e-9db8-4c6b-b844-9de8015517cc" />

## 🔐 Authentication

* JWT-based authentication
* Role-based access:

  * Student
  * Club
  * Admin

---

## 📸 Core Functionalities

* Event creation with banner upload
* Role-based dashboards
* Event approval workflow
* Search & filter events
* Responsive UI 
---

## 📊 Future Enhancements

* 📈 Advanced analytics dashboard
* 🔔 Real-time notifications
* 🤖 AI-based event recommendations
* 📅 Calendar integration

---

## 👩‍💻 Author

**Palak Neekhra**
Computer Science Student

---

## 🌟 Support

If you like this project:

⭐ Star the repo
🍴 Fork it
📢 Share it

