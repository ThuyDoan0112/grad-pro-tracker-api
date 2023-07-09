const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProject = async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is require",
      });
    }

    const existProject = await prisma.project.findUnique({
      where: {
        name,
      },
    });
    if (existProject) {
      return res.status(400).json({
        message: "Project name already exists",
      });
    }

    const project = await prisma.project.create({
      data: {
        userId,
        name,
      },
    });
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
const getProjects = async (req, res) => {
  try {
    const userId = Number(req.query.userId);

    const projects = await prisma.project.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const projectId = Number(req.params.id);
    const { name, description, databaseSchema, githubRepository } = req.body;

    let existProject = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!existProject) {
      return res.status(400).json({
        message: "Project not found",
      });
    }

    existProject = await prisma.project.findFirst({
      where: {
        id: { not: projectId },
        name,
      },
    });
    if (existProject) {
      return res.status(400).json({
        message: "Project name already exists",
      });
    }

    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        description,
        databaseSchema,
        githubRepository,
      },
    });

    res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = { createProject, getProjects, updateProject };
