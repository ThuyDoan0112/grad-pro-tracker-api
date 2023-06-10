// Require third-party module express
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// To read environment variables from .env file
dotenv.config();

// Init express app
const app = express();

// Middlewares
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use(morgan('dev'));

// Handle routes
app.get('/', (req, res) => {
  res.send('Hello, World');
});

app.get('/users', (req, res) => {
  const users = [
    {
      name: 'Thuy',
      age: 21,
    },
    {
      name: 'Duong',
      age: 22,
    },
  ];

  res.send(users);
});

// Start express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
