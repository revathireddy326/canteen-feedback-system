const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const cors = require('cors');  // Import cors

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Session setup
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Travel request routes
const requestRoutes = require('./routes/requestRoutes');
app.use('/api/requests', requestRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
