const router = require("express").Router()
const {createTask, getAllTask, getSingleTask, updateTask, deleteTask, getDeletedTask, retrieveTask} = require("../controllers/taskController")

//////    Standard Method of structuring your routes domain below;  //////
//Separating and ordering your routes ensures your server interprets incoming URLs cleanly bcus express handles requests from top to bottom.

//== Direct routes;
router.route("/").get(getAllTask).post(createTask); 
// == Trash routes;
router.route("/trash").get(getDeletedTask);

//== Dynamic routes;
router.route("/:taskId").get(getSingleTask).patch(updateTask).delete(deleteTask);
//== Dynamic retrieve route stays at the buttom bcus it has a unique hardcoded prefic with 2 segments: 1 text(/retrieve/), 1 variable(/:taskId)
router.route("/retrieve/:taskId").patch(retrieveTask);




module.exports = router