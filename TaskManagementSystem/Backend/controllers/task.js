const Task = require("../models/taskModel");
const createError = require("../utils/error");
const createTask = async (req, res, next) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      user: req.user.id,
      completed: req.body.completed,
    });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (err) {
    return res.status(404).json({error: err.message})
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const getCurrentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    console.log(req.params.task)
    if (!task) {
      return next(createError({ status: 404, message: "No task" }));
    }
    if (task.user.toString() !== req.user.id) {
      return next(createError({ status: 401, message: "Not your task" }));
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true }
    );
    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return next(createError({ status: 404, message: "Task not found" }));
    }
    if (task.user.toString() !== req.user.id) {
      return next(createError({ status: 401, message: "It is not your task" }));
    }
    await Task.findByIdAndDelete(req.params.taskId);
    return res.status(200).json("Task deleted successfully");
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  createTask,
  getAllTasks,
  getCurrentUserTasks,
  updateTask,
  deleteTask,
};
