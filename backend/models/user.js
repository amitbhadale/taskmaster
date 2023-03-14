const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Kindly provide first Name"],
  },
  lastName: {
    type: String,
    required: [true, "Kindly provide Last name"],
  },
});

module.exports = mongoose.model("User", userSchema);
