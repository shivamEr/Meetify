const express = require('express');
const connectDB = require('./config/connectDB');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes importing
const authRoutes = require('./routes/Auth'); // <-- Potential issue here
// const meetRoutes = require('./routes/Meeting');

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/meeting', meetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
