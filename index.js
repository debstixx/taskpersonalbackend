 // 1. npm init -y
// 2. npm install nodemon --save-dev
// 3. npm install express
// 4. npm install mongoose
// == ENV ==
// installing env package:- "npm install dotenv --save"

const express = require("express") //first tin to set up inside ur index after installing then require.
const app = express();
require("dotenv").config() //After installing .env we have to require with ".config()" method.

// 'process.env.' is added to the PORT to give available port number if declared port is not available when github. shown below
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose") //after installing mongoose u then require it. Mongoose is used to establish a connnection with the database.
const taskRouter = require("./routes/taskRouter")// this imported and require to be used as a middleware

// Middlewares below;
app.use(express.json())
// app.use("/api/v1", taskRouter)// to use dis as a middleware u have to import it, then require and store in a variable name.
app.use("/api/v1/tasks", taskRouter)// "/tasks is added to middleware as standard route domain"


// creating an establish to connect our server to the database i.e server should run wen connected to database.
const start = async () => {
   try {
    //using our env: it is connected to the liveserver to require it using "process.env.?"
     await mongoose.connect(process.env.MONGODB_URI); //".connect()" is a method to connect mongoose to our database
     app.listen(PORT, ()=>{
     console.log(`server is running on port ${PORT} and database connected`);
     });
   } catch (error) {
     console.log(error);
    }
};
start()









