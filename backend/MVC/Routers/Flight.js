const express = require("express");

const flightRouter = express.Router();
const { flights ,getFlights,getSingleFlightById} = require("../controllers/Flight");
const auth =require("../middleware/authentication")

flightRouter.post("/", auth,flights);
flightRouter.get("/", getFlights);
flightRouter.get("/:id",getSingleFlightById);





module.exports=flightRouter;