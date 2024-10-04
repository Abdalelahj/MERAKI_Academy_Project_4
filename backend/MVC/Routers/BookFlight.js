const express =require("express")

const BookFlightRouter = express.Router()
const {bookFlight}=require("../controllers/BookFlight")
const auth =require("../middleware/authentication")



BookFlightRouter.post("/",auth,bookFlight)



module.exports=BookFlightRouter