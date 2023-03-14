const express = require("express");
const {
  addBucket,
  deleteBucket,
  getBuckets,
  updateBucket,
} = require("../controller/bucket");

const router = express.Router();

router.route("/bucket").post(addBucket).get(getBuckets);
router.route("/bucket/:id").put(updateBucket).delete(deleteBucket);

module.exports = router;
