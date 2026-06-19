const router = require("express").Router()
const {createTask, getAllTask, getSingleTask, updateTask, deleteTask} = require("../controllers/taskController")

//////    Standard Method of structuring your routes domain below;  //////
//== Direct routes;
router.route("/").get(getAllTask).post(createTask); 
//== Dynamic routes;
router.route("/:taskId").get(getSingleTask).patch(updateTask).delete(deleteTask);




module.exports = router