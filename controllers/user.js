const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { email, password, name, projectName } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, name and password are require!",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        projects: {
          create: [
            {
              name: projectName,
            },
          ],
        },
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { createUser };
