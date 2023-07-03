// Require third-party module express
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
// sign-up user
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

// sign-in user
app.post('/api/auth/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email, name and password are require!',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: 'User is not exist!',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: 'Password is not correct!',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
    });
  }
});

// auth middleware
app.use(async (req, res, next) => {
  // TODO: get token from req headers
  let token;
  if (req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorize',
    });
  }

  // TODO: verify token
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  // TODO: Check if user existed in database
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  if (!user) {
    return res.status(404).json({
      message: 'Please login!',
    });
  }
  // TODO: Assign req.user = current user and call next() => move to next handler
  req.user = user;
  next();
});

// Start express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
