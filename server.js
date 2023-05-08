// Require third-party module express
const express = require('express');

// Init express app
const app = express();

// Handle routes
app.get('/', (req, res) => {
  res.send('Hello World');
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
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
