const mongoose = require("mongoose")
const Schema = mongoose.Schema //Schema is from mongoose used to create a structure for mongoose.


//Example: Our project requires some things, 
// a. title
// b. task description
// c. date
// d. tags: whether it is completed or not

// schema constructor
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema)