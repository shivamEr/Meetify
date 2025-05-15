const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/Auth');
const roomRoutes = require('./routes/Room');
const turnRoute = require('./routes/Turn')

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// Stun server used
app.use(turnRoute);

// Room Users Map
const roomUsers = new Map();


io.on('connection', (socket) => {
  console.log(`🔌 Socket connected: ${socket.id}`);

  // Join a room
  socket.on('join-room', ({ roomId, user }) => {
    socket.join(roomId);
    socket.roomId = roomId;
    socket.user = user;

    if (!roomUsers.has(roomId)) roomUsers.set(roomId, []);
    const users = roomUsers.get(roomId);
    users.push({ id: socket.id, ...user });
    io.to(roomId).emit('room-users', users);

    socket.to(roomId).emit('user-joined', socket.id);
  });

  // WebRTC Signaling
  socket.on('signal', ({ to, from, signal }) => {
    io.to(to).emit('signal', { from, signal });
  });

  // Chat
  socket.on('chat-message', ({ roomId, sender, message }) => {
    socket.to(roomId).emit('chat-message', { sender, message });
  });

  // Media Toggle
  socket.on('media-toggle', ({ roomId, type, state }) => {
    socket.to(roomId).emit('media-toggle', {
      from: socket.id,
      type,
      state
    });
  });

  // Screen Sharing
  socket.on('screen-share-start', ({ roomId }) => {
    socket.to(roomId).emit('screen-share-started', { from: socket.id });
  });

  socket.on('screen-share-stop', ({ roomId }) => {
    socket.to(roomId).emit('screen-share-stopped', { from: socket.id });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(socket.id, "Disconnected");
    const roomId = socket.roomId;
    if (roomId && roomUsers.has(roomId)) {
      const users = roomUsers.get(roomId).filter(u => u.id !== socket.id);
      roomUsers.set(roomId, users);
      io.to(roomId).emit('room-users', users);
      socket.to(roomId).emit('user-left', socket.id);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
