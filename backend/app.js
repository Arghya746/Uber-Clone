const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

const app = express();

// Connect to database
connectToDb();

// ✅ Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
app.get('/', (req, res) => {
  res.send("Hello");
});

// Routes
app.use('/users', userRoutes);
app.use('/captain', captainRoutes); // or '/captain' if you want
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;
