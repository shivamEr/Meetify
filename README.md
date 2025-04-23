# 📞 Real-Time Meeting App

A full-stack web application that allows users to create and join public or private real-time meetings with messaging, video chat, screen sharing, and file sharing.

## 🚀 Tech Stack

**Frontend:**
- React + Vite
- Axios
- React Router DOM
- Socket.IO Client

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT (Authentication)
- Socket.IO (WebSockets)

---

## 🏗️ Project Structure

```
your-app/
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── sockets/
│       ├── context/
│       └── App.jsx
├── server/           # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── sockets/
│   ├── config/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .gitignore
└── README.md
```

---

## 🛠️ Local Setup Instructions

### ⚙️ Prerequisites
- Node.js (v16+)
- MongoDB local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### 🔧 Step 1: Clone Repo

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

---

### ⚙️ Step 2: Backend Setup

```bash
cd server
npm install
```

#### ➕ Create `.env` in `server/`
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
```

#### ▶️ Run Server
```bash
npm run dev
```

---

### 💻 Step 3: Frontend Setup

```bash
cd ../client
npm install
```

#### ➕ Create `.env` in `client/`
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_SERVER=http://localhost:5000
```

#### ▶️ Run Client
```bash
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| POST   | /api/auth/signup      | Register a new user    |
| POST   | /api/auth/login       | Login and get token    |
| POST   | /api/meeting/create   | Create a meeting       |
| GET    | /api/meeting/public   | Get public meetings    |
| POST   | /api/meeting/join     | Join a meeting         |

---

## 🔌 Socket.IO Events

| Event          | Payload                | Description           |
|----------------|------------------------|-----------------------|
| `user:join`    | { userId, meetingId }  | User joins meeting    |
| `message:new`  | { sender, content }    | Chat message sent     |
| `user:mute`    | { userId }             | Host mutes user       |
| `screen:share` | { stream }             | Start screen share    |
| `user:kick`    | { targetId }           | Host kicks a user     |

---

## 📦 Scripts

### Backend (`/server`)
```bash
npm run dev   # start dev server with nodemon
```

### Frontend (`/client`)
```bash
npm run dev   # start Vite dev server
```

---

## 🧾 .gitignore (Recommended)

> In both `server/` and `client/`

```
node_modules/
.env
uploads/
dist/
build/
.DS_Store
```

---

## 🌐 Deployment Tips

- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Render](https://render.com/) / [Railway](https://railway.app/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 📌 Roadmap

- [x] Auth system (JWT)
- [x] Meeting creation + joining
- [x] Real-time chat (Socket.IO)
- [ ] WebRTC video/audio
- [ ] Screen sharing
- [ ] File uploads (AWS or local)
- [ ] Host controls panel
- [ ] Recording support

---

## 🧑‍💻 Author

Built with 💻 & ❤️ by [TeamWork](https://github.com/shivamer)



