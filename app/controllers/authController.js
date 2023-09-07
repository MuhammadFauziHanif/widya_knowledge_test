const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { jwtSecret } = require('../../config/jwt');
const Joi = require('joi');

// Define a Joi schema for registration data validation
const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  password: Joi.string().min(6).required(),
});

exports.register = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    // Validate user input
    const { error } = registrationSchema.validate({ name, email, gender, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      gender,
      password: hashedPassword,
    });

    // Generate a JWT token upon successful registration
    const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });

    // Return the token and user details in the response
    res.status(201).json({ token, user: { id: newUser.id, name, email, gender } });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Define a Joi schema for login data validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token upon successful login
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Return the token and user details in the response
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, gender: user.gender } });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
