const express = require("express");

const hotelRouter = express.Router();
const { addHotel,getHotels,getHotelsById } = require("../controllers/hotels");
const auth =require("../middleware/authentication")

hotelRouter.post("/", auth,addHotel);
hotelRouter.get("/", getHotels);
hotelRouter.get("/:id", getHotelsById);

module.exports = hotelRouter;
