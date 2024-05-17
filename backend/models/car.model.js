const mongoose = require('mongoose');

// Car schema
const carSchema = new mongoose.Schema({
  carMake: {
    type: String,
    required: true,
    trim: true
  },
  carModel: {
    type: String,
    required: true,
    trim: true
  },
  carYear: {
    type: Number,
    required: true
  },
  carSeat: {
    type: Number,
    required: true
  },
  carFuelType: {
    type: String,
    required: true
  },
  carPricePerKlm: {
    type: Number,
    required: true
  },
  renterName: {
    type: String,
    required: true,
    trim: true
  },
  rentalDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Car model
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
