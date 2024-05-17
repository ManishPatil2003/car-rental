const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const carRoutes = require('./routes/car.route');
const userRoutes = require('./routes/user.route');
const bookingRoutes = require('./routes/booking.route');
const cors = require("cors")

const authRoutes = require('./routes/auth.route');

const db = require("./config/dbConnect")
const cookieParser = require('cookie-parser');
const app = express();

// Configure cookie-parser middleware
app.use(cookieParser());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:272/car_rental', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Routes
app.use('/api/cars', carRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/bookings', bookingRoutes);
// Auth routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
db.once('open', () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
