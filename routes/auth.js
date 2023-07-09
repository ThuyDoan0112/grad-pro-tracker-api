const express = require("express");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middlewares/auth");
const authController = require("./../controllers/auth");

const router = express.Router();

router.post("/sign-in", authController.signIn);

router.use(authMiddleware);

router.get("/me", authController.getMe);

module.exports = router;
