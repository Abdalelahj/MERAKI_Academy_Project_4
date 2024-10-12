const express =require("express")

const UserRouter=express.Router()

const {register,login,updateInfo}=require("../controllers/user")
const auth = require("../middleware/authentication");

UserRouter.post("/register",register)
UserRouter.post("/login",login)
UserRouter.post("/update",auth,updateInfo)




module.exports=UserRouter
