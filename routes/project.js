const express = require("express");
const projectController = require("./../controllers/project");

const router = express.Router();

router
  .route("/")
  .post(projectController.createProject)
  .get(projectController.getProjects);

router.route("/:id").put(projectController.updateProject);

module.exports = router;
