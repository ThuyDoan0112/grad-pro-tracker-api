// Require third-party module express
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// To read environment variables from .env file
dotenv.config();

// Init express app
const app = express();

// Middlewares
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

app.use(morgan("dev"));

app.use(express.json());

// Handle routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Start express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
