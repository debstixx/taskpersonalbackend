const Task = require("../models/taskSchema") //Tasks varaiable is used to query the database


// a. function to create a task;
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

// b. function to get all  tasks;
const getAllTask = async (req, res) => {
    const {userId} = req.user;
    try {
    //"isDelete" switch is added to getAllTask to prevent deleted task from showing and set "false" 
        const tasks = await Task.find({ createdby: userId, isDeleted: false})
        res.status(200).json({success:true, tasks})
    } catch (error) {
        res.json({error})
    }
}

// c. function to get a single task;
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

// d. function to update a task;
const updateTask = async (req, res) => {
    const {userId} = req.user;
    const {taskId} = req.params;
    try {
      const  task = await Task.findOneAndUpdate(
        {createdby: userId, _id: taskId}, 
        req.body,
        {new: true, runValidators: true}
    );
      res.status(200).json({success: true, task})
    } catch (error) {
        res.json({error})
    }
}
// Branching strategy:
// Creating a dedicated feature branch, swap to that branch.
//1. "git checkout main": to move from the main branch
//2. "git checkout -b feature/soft-delete" : create and swap to your new soft-delete branch

// Redesigning delete task workflow into what we call “soft delete”. This ensures that if a task is deleted, a user can retrieve it.
// A page is dedicated for the user to see the trashed tasks.
// Merging the new branch into your main or master branch

// e. function to delete a task;
const deleteTask = async (req, res) => {
    const {userId} = req.user;
    const {taskId} = req.params;
    try {
    //'findOneAndDelete would be change to findOneAndUpdate deleted tasks to a new page, not to delete permanently    
        // const task = await Task.findOneAndDelete({createdby: userId, _id:taskId})
        // res.status(200).json({success: true, msg: "Task deleted successfully"})
        const task = await Task.findOneAndUpdate(
            { createdby: userId, _id: taskId }, //find the task owned by this user
            { isDeleted: true },                //switch the toggle to move it to trash
            { new: true }                       //return the updated document version
        );
        if (!task) {
            return res.status(404).json({ success: false, msg: `No task found with id ${taskId}` });
        }
        res.status(200).json({ success: true, msg: "Task moved to trash successfully" });
    } catch (error) {
        res.json({error})
    }
}

//f. function to getDeletedTask;
const getDeletedTask = async (req,res) => {
       const {userId} = req.user;
       try {
         const tasks = await Task.find({ createdby: userId, isDeleted: true })
         res.status(200).json({success: true, tasks})
       } catch (error) {
         res.status(500).json({ success: false, error: error.message });
       }
}

// g. function to retrieve deleted task;
const retrieveTask = async (req, res) => {
       const {userId} = req.user;
       const {taskId} = req.params;
    try {
        const task = await Task.findOneAndUpdate(
            { createdby: userId, _id: taskId }, //find the task owned by this user
            { isDeleted: false },                //switch the toggle to move it back to myTask
            { new: true }                       //return the updated document version
        );
        if (!task) {
            return res.status(404).json({ success: false, msg: `No task found with id ${taskId}` });
        }
        res.status(200).json({ success: true, msg: "Task restrieved successfully", task });
    } catch (error) {
        res.json({error})
    }
}

module.exports = {createTask, getAllTask, getSingleTask, updateTask, deleteTask, getDeletedTask, retrieveTask}