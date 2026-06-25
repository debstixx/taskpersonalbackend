// 1. npm init -y
// // 2. npm install nodemon --save-dev
// 3. npm install express
// 4. npm install mongoose
// == ENV ==
// installing env package:- "npm install dotenv --save"
// == BCRYPT ==
// 6. "npm install bcrypt" package code
// == Validator ==
// 7. "npm i validator" package code
// == JWT == 
// 8. "npm install jsonwebtoken" package code
// == cors ==
// 9. "npm install cors" package to link fornt end and backend

const express = require("express") 
const cors = require("cors");
const app = express();
const mongoose = require("mongoose")
require("dotenv").config();
const PORT = process.env.PORT || 3000
const authRouter = require("./routes/authRouter.js")
const taskRouter = require("./routes/taskRouter")// taskRouter is imported and require to be used as a middleware
const auth = require("./middlewares/authentication.js")
const notfound = require("./utils/notfound.js")



// Middlewares below;
app.use(express.json());
app.use(cors());
app.use("/api/v1", authRouter)
app.use("/api/v1/tasks", auth, taskRouter)// "/tasks is added to middleware as standard route domain"
app.get("/",(req, res) =>{
  res.status(200).json({success:true, message: "server is live"})
})
app.use(notfound)





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









