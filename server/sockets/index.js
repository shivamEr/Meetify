const app = require('./app');
const http = require('http');
const socketSetup = require('./sockets');
const connectDB = require('./config/connectDB');

const server = http.createServer(app);
socketSetup(server); // Attach Socket.IO

connectDB(); // MongoDB connection

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
