const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

module.exports = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');

  // Check if the token is missing
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Bearer token is missing' });
  }

  // Extract the token (remove "Bearer " from the string)
  const token = authHeader.slice(7);

  try {
    // Verify the token and decode its payload
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the user ID from the token to the request object for later use
    req.userId = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
