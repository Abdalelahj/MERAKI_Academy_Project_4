const express =require("express")

const UserRouter=express.Router()

const {register,login}=require("../controllers/user")

UserRouter.post("/register",register)
UserRouter.post("/login",login)




module.exports=UserRouter
