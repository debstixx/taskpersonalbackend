const mongoose = require("mongoose")
const Schema = mongoose.Schema //Schema is from mongoose used to create a structure for mongoose.


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a task title"]
    },
    description: {
        type: String,
        required: [true, "Please provide the description"]
    },
    tag: {
        type: String,
        enum: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]
    },
    createdby: {
        type: mongoose.Types.ObjectId, //this provide the user Id from the userSchema with reference from "User"
        ref: "User",
        required: [true, "Please provide the goal writer"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Task", taskSchema)
