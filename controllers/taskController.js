const Task = require("../models/taskSchema") //Tasks varaiable is used to query the database


// a. create a task;
const createTask = async (req, res) => {
    const {userId} = req.user;
    req.body.createdby = userId
    try {
       const task = await Task.create(req.body) 
       res.status(201).json({success: true, task})
    } catch (error) {
        res.json({error})
    }
}

// b. get all  tasks;
const getAllTask = async (req, res) => {
    const {userId} = req.user;
    try {
        const tasks = await Task.find({ createdby: userId })
        res.status(200).json({success:true, tasks})
    } catch (error) {
        res.json({error})
    }
}

// c. get a single task;
const getSingleTask = async (req, res) => {
    const {userId} = req.user;
    const {taskId} = req.params;
    try {
        const task = await Task.findOne({createdby: userId, _id: taskId})
        res.status(200).json({success: true, task})
    } catch (error) {
        res.json({error})
    }
}

// d. update a blog;
const updateTask = async (req, res) => {
    const {userId} = req.user;
    const {taskId} = req.params;
    try {
      const  task = await Task.findOneAndUpdate({createdby: userId, _id: taskId}, req.body, {new: true}, {runValidators: true});
      res.status(200).json({success: true, task})
    } catch (error) {
        res.json({error})
    }
}

// e. delete a task;
const deleteTask = async (req, res) => {
    const {userId} = req.user;
    const {taskId} = req.params;
    try {
        const task = await Task.findOneAndDelete({createdby: userId, _id:taskId})
        res.status(200).json({success: true, msg: "Task deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}


module.exports = {createTask, getAllTask, getSingleTask, updateTask, deleteTask}