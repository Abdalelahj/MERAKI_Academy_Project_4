const express =require("express")

const BookFlightRouter = express.Router()
const {bookFlight, getBookedFlights}=require("../controllers/BookFlight")
const auth =require("../middleware/authentication")



BookFlightRouter.post("/",auth,bookFlight)
BookFlightRouter.get("/",auth,getBookedFlights)



module.exports=BookFlightRouter