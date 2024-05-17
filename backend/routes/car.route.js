const express = require('express');
const router = express.Router();
const CarController = require('../controllers/cars.controller');

// GET request to list all cars
router.get('/', CarController.getAllCars);

// GET request to get a single car by ID
router.get('/:id', CarController.getCarById);

// POST request to add a new car
router.post('/', CarController.addNewCar);

// PUT request to update a car's information
router.put('/:id', CarController.updateCar);

// DELETE request to remove a car
router.delete('/:id', CarController.deleteCar);

module.exports = router;
