const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./config/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Routes
const authRoutes = require('./app/routes/authRoutes');
const userRoutes = require('./app/routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Database connection
db.authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
