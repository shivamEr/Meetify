const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const connectDB = require('./config/connectDB');
const socketSetup = require('./sockets');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // for dev only
    methods: ["GET", "POST"]
  }
});

socketSetup(io);  // custom Socket.IO logic

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
