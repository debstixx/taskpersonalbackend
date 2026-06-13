const Tasks = require("../models/task") //Tasks varaiable is used to query the database


// a. get all tasks
const getAllTask = async (req, res)=>{
    try {
        const task = await Tasks.find({}) // find() is a method used to find all key and value in the database i.e 'Tasks'
        res.status(200).json({success: true, task})
    } catch (error) {
        res.status(500).json({sucess: false, error})
    }
}
// b. get single task
const getSingleTask = async (req, res) => {
    const {taskId} = req.params
    try {
        const task = await Tasks.findById({_id: taskId})// findById() is a method used to find each Id key and value in the database i.e 'Tasks'
        res.status(200).json({success:true, task})
    } catch (error) {
        res.status(500).json({success:false, error})
    }
}
// c. create task
const createTask = async (req, res) => {
    //res.send(req.body)

    const {title, description, tags} = req.body
    if (!title || !description || !tags){
       return res.status(401).json({sucess: false, error: "please provide neccesary information"})
    }
    try {
        const task = await Tasks.create(req.body)
        res.status(201).json({success: true, task})
    } catch (error) {
        res.status(500).json({sucess: false, error})
    }
}
// d. update task
const updateTask = async (req, res)=> {
    const {taskId}= req.params
    try {
        const task = await Tasks.findByIdAndUpdate({_id: taskId}, req.body, {new: true}, {runValidators: true})
        // the {new: true} help to make sure it update wen a change is made without error
        // {runValidators: true} :- this checked for every reqiurement in the schema structure
        res.status(200).json({success: true, task})
    } catch (error) {
        res.status(500).json({success: false, error})
    }
}
// e. delete task
const deleteTask = async (req, res) => {
    const {taskId}= req.params;
    try {
        const task = await Tasks.findByIdAndDelete({_id: taskId})
        res.status(200).json({success: true, message: "Task deleted successfully"})
    } catch (error) {
       res.status(500).json({success: false, error}) 
    }
}


module.exports = {getAllTask, createTask, getSingleTask, updateTask, deleteTask}