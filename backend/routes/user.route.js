const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');



// Get all users
router.get('/', userController.getAllUsers);

// Get a single user
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;