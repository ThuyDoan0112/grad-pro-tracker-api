const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
  // TODO: get token from req headers
  let token;
  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Unauthorize",
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
      message: "Please login!",
    });
  }
  // TODO: Assign req.user = current user and call next() => move to next handler
  req.user = user;
  next();
};
