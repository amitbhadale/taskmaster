const Bucket = require("../models/bucket");

exports.addBucket = async (req, res) => {
  try {
    const bucket = await Bucket.create(req.body);
    res.status(200).json({
      success: true,
      bucket,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getBuckets = async (req, res) => {
  try {
    // const buckets = await Bucket.find().populate("tasks");
    const buckets = await Bucket.find().populate({
      path: "tasks",
      populate: {
        path: "assignedTo",
      },
    });
    res.status(200).json({
      success: true,
      buckets,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteBucket = async (req, res) => {
  try {
    const bucket = await Bucket.findById(req.params.id);
    if (!bucket)
      return res
        .status(404)
        .json({ success: false, message: "Bucket not found" });

    if (bucket.tasks.length > 0)
      return res.status(500).json({
        success: false,
        message: "Cannot delete. Bucket has open tasks",
      });

    await Bucket.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ success: true, message: "Bucket Deleted" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateBucket = async (req, res) => {
  try {
    const bucketId = req.params.id;
    const bucket = await Bucket.findById(bucketId);
    if (!bucket)
      return res
        .status(404)
        .json({ success: false, message: "Bucket not found" });

    await Bucket.findByIdAndUpdate(bucketId, req.body);
    res.status(200).json({ success: true, message: "Bucket Updated" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
