const rentals = require("../models/car.model")
const CarController = {
  // Get all cars
  getAllCars: async (req, res) => {
    try {
      res.json(rentals);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Get a single car by ID
  getCarById: async (req, res) => {
    try {
      const car = rentals.find(car => car.id === parseInt(req.params.id));
      if (!car) {
        return res.status(404).send('Car not found');
      }
      res.json(car);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Add a new car
  addNewCar: async (req, res) => {
    try {
        const { carMake, carYear, carModel, carSeat, carFuelType, carPricePerKlm, renterName, rentalDate, returnDate } = req.body;

        // Input validation
        if (!carModel || !carSeat || !carFuelType || !carPricePerKlm || !renterName || !rentalDate || !returnDate) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        if (typeof carPricePerKlm !== 'number' || isNaN(carPricePerKlm)) {
            return res.status(400).json({ error: 'Invalid carPricePerKlm, must be a number.' });
        }
        // Additional validation for dates, etc. could be added here

        const newCar = {
            id: rentals.length + 1,
            carMake,
            carModel,
            carYear,
            carSeat,
            carFuelType,
            carPricePerKlm,
            renterName,
            rentalDate,
            returnDate
        };

        // Add the new car to the list of rentals
        const savedCar = await newCar.save();

        // Send a success response
        res.status(201).json({ message: 'Car added successfully.', newCar : savedCar });
    } catch (error) {
        console.error('Error adding new car:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
,

  // Update a car's information
  updateCar: async (req, res) => {
    try {
      const rental = rentals.find(c => c.id === parseInt(req.params.id));
      if (!rental) {
        return res.status(404).send('The rental with the given ID was not found.');
      }
      rental.carMake = req.body.carMake ?? rental.carMake;
      
      rental.carModel = req.body.carModel;
      rental.carYear = req.body.carYear ? parseInt(req.body.carYear) : rental.carYear;
      rental.renterName = req.body.renterName;
      rental.rentalDate = req.body.rentalDate;
      rental.returnDate = req.body.returnDate;
      rental.carSeat = req.body.carSeat;
      rental.carFuelType=req.body.carFuelType;
      rental.carPricePerKlm=parseFloat(req.body.carPricePerKlm);

      const updatedCar = await car.save();
      res.json(updatedCar);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Delete a car
  deleteCar: async (req, res) => {
    try {
      const car = await Car.findByIdAndDelete(req.params.id);
      if (!car) {
        return res.status(404).send('The car with the given ID was not found.');
      }
      res.json(car);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = CarController;