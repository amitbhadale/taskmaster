const User = require("../models/user");

exports.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await User.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    await User.findByIdAndUpdate(userId, req.body);
    res.status(200).json({ success: true, message: "User Updated" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
