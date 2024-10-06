const express = require("express");

const BookHotelRouter = express.Router();
const {BookHotel,getBookedHotels} = require("../controllers/BookHotel");
const auth =require("../middleware/authentication")

BookHotelRouter.post("/", auth,BookHotel);
BookHotelRouter.get("/", auth,getBookedHotels);

module.exports = BookHotelRouter;
