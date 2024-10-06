const express = require("express");

const hotelRouter = express.Router();
const { addHotel,getHotels } = require("../controllers/hotels");
const auth =require("../middleware/authentication")

hotelRouter.post("/", auth,addHotel);
hotelRouter.get("/", getHotels);

module.exports = hotelRouter;
