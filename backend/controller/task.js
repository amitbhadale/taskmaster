const Task = require("../models/task");
const Bucket = require("../models/bucket");

exports.createTask = async (req, res) => {
  try {
    const newtask = req.body;
    const bucket = await Bucket.findById(req.body.bucket);
    if (!bucket)
      return res
        .status(404)
        .json({ success: false, message: "Bucket not found" });

    const task = await Task.create(newtask);
    bucket.tasks.push(task._id);

    await bucket.save();

    res.status(200).json({
      success: true,
      task,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const taskArr = await Bucket.find(
      { _id: task.bucket },
      { tasks: 1, _id: 0 }
    );

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    //finding this task is present in which bucket to update that bucket array list
    const indexofTask = taskArr[0].tasks.indexOf(req.params.id);
    taskArr[0].tasks.splice(indexofTask, 1);
    //updating the bukckets array list after deleting thatask from it
    await Bucket.findOneAndUpdate(
      { _id: task.bucket },
      { tasks: taskArr[0].tasks }
    );

    //deleting the task from task collecton as well
    await Task.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({ success: true, message: "Task Deleted" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    await Task.findByIdAndUpdate(taskId, req.body);
    res.status(200).json({ success: true, message: "Task Updated" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const currentBuk = await Bucket.findById(req.body.oldBuck);
    const action = req.body.action;
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Taskz not found" });

    if (!currentBuk)
      return res
        .status(404)
        .json({ success: false, message: "currentBuk not found" });

    const allBuckets = await Bucket.find();

    const bucktIdx = allBuckets
      .map((i) => i._id.toString())
      .indexOf(req.body.oldBuck);
    const newBcktId =
      allBuckets[action === "next" ? bucktIdx + 1 : bucktIdx - 1]._id;
    const newBckt = await Bucket.findById(newBcktId);
    newBckt.tasks.push(task._id);
    await newBckt.save();

    const taskInd = currentBuk.tasks.indexOf(task._id);
    currentBuk.tasks.splice(taskInd, 1);
    await currentBuk.save();

    task.bucket = newBcktId;
    await task.save();

    res.status(200).json({ success: true, message: "Task Moved" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getTaskDetails = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Taskz not found" });

    res.status(200).json({ success: true, task });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// exports.getTasks = async (req, res) => {
//   try {
//   } catch (e) {
//     res.status(500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };
