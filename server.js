// Require third-party module express
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

app.use(express.json());

// Handle routes
app.post('/api/users', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: 'Email, name and password are require!',
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
      name,
    },
  });

  return res.status(201).json(user);
});

// Start express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
