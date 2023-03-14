const express = require("express");
const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  moveTask,
  getTaskDetails,
} = require("../controller/task");

const router = express.Router();

router.route("/tasks").post(createTask).get(getTasks);
router
  .route("/tasks/:id")
  .delete(deleteTask)
  .put(updateTask)
  .post(moveTask)
  .get(getTaskDetails);

module.exports = router;
