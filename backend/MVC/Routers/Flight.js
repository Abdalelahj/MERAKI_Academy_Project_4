const express = require("express");

const flightRouter = express.Router();
const { flights ,getFlights,getSingleFlights} = require("../controllers/Flight");
const auth =require("../middleware/authentication")

flightRouter.post("/", auth,flights);
flightRouter.get("/d", auth,getFlights);
flightRouter.get("/s", auth,getSingleFlights);





module.exports=flightRouter;