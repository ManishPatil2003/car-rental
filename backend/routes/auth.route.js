const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


// Registration
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

router.get('/user',authController.getUserById);

module.exports = router;