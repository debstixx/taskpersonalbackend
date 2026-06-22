const router = require("express").Router()
const auth = require("../middlewares/authentication")
const {register, login, updateProfile} = require("../controllers/authController")


//ROUTE 1
router.post("/register", register)
//ROUTE 2
router.post("/login", login)
// ROUTE 3 
router.patch("/profile", auth, updateProfile)




module.exports = router