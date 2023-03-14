const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Please enter a Caption"],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: Number,
  },
  bucket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bucket",
    required: [true, "Bucket is required"],
  },
  notes: String,
});

module.exports = mongoose.model("Task", taskSchema);
