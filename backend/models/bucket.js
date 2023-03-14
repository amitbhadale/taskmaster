const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kindly enter bucket name"],
  },
  sequence: Number,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Bucket", bucketSchema);
