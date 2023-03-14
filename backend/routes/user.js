const express = require("express");
const {
  addUser,
  deleteUser,
  updateUser,
  getUsers,
} = require("../controller/user");

const router = express.Router();

router.route("/user").post(addUser).get(getUsers);
router.route("/user/:id").put(updateUser).delete(deleteUser);

module.exports = router;
