const router = require("express").Router()
const {getAllTask, createTask, getSingleTask, updateTask, deleteTask} = require("../controllers/taskController")

//////    Standard Method of structuring your routes domain below;  //////
//== Direct routes;
router.route("/").get(getAllTask).post(createTask); 
//== Dynamic routes;
router.route("/:taskId").get(getSingleTask).patch(updateTask).delete(deleteTask);


/////   initial method of setting up route domain  /////
// //ROUTE 1
// router.get ("/tasks", getAllTask)
// //router.get ("/", getAllTask) // new route method: "/tasks" added to the middle ware as route domain

// //ROUTE 2
// router.get ("/tasks", createTask)
// //router.post ("/", createTask)

// //ROUTE 3
// router.get("/tasks/:taskId", getSingleTask)
// router.get("/:taskId", getSingleTask)

// //ROUTE 4
// router.delete("/tasks/:taskId", updateTask)
// router.patch("/:taskId", updateTask)

// //ROUTE 5
// //router.delete("/tasks/:taskId", deleteTask)
// router.delete("/:taskId", deleteTask)





module.exports = router