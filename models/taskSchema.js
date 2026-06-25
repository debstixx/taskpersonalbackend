const mongoose = require("mongoose")
const Schema = mongoose.Schema //Schema is from mongoose used to create a structure for mongoose.


//To create a dedicated feature branch and swap to that branch, 'git checkout main" commands is run my project's root terminal to checkout from my main branch and "git checkout -b feature/soft-delete" switch over to a dedicated feature branch:

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
        enum: ["Urgent", "Important"]
    },

    // I apply a soft delete switch("isDeleted") to my schema to act as a toggle to hide data without permanently deleting the data.
    isDeleted: {
    type: Boolean,
    default: false //'false' means when a user creates a new task, it's NOT deleted by default!
     },
    createdby: {
        type: mongoose.Types.ObjectId, //this provide the user Id from the userSchema with reference from "User"
        ref: "User",
        required: [true, "Please provide the task writer"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Task", taskSchema)
