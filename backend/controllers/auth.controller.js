const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password,confirmPassword  } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    const userResponse = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };
    res.status(201).json({ message: 'User registered successfully', user: userResponse });

  
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

// Login
// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token with the user ID and a secret key
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Set the cookie with the token
    res
      .status(200)
      .cookie('token', token, { httpOnly: true })
      .json({
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};


 const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(403).json({ error: 'Invalid authentication token' });
  }
};
exports.getUserById =  verifyToken,  async (req, res) => {
  try {
     // Replace this with your logic to fetch user details from the database
     const user = {
      //  id: req.user.userId,
       name: 'John Doe',
       email: 'john@example.com',
     };
 
     res.json(user);
   } catch (error) {
     console.error('Error fetching user details:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 }
