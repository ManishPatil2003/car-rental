const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://dhirajpatel131225:THfnNbkPYErH4rOw@car-rental.7x6ogdn.mongodb.net/car-rental-web';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Adjust the timeout value as needed
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to the database:', error);
});

db.once('open', () => {
    console.log('Connected to the database');
});
module.exports = db;