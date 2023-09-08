const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../config/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const authRoutes = require('../app/routes/authRoutes');
const userRoutes = require('../app/routes/userRoutes');

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

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
