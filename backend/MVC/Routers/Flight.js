const express = require("express");

const flightRouter = express.Router();
const { flights ,getFlights,getSingleFlights} = require("../controllers/Flight");
const auth =require("../middleware/authentication")

flightRouter.post("/", auth,flights);
flightRouter.get("/d", getFlights);
flightRouter.get("/s",getSingleFlights);





module.exports=flightRouter;