const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    // Extract the user ID from the authenticated request (assuming we have middleware to verify the JWT)
    const userId = req.userId;

    // Fetch user profile data from the database using the user ID
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'gender'], // Specify the attributes we want to include in the response
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user profile as a JSON response
    res.status(200).json(user);
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
