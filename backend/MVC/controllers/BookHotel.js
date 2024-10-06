const BookModel = require("../models/BHotelSchema");
const userCardModel = require("../models/userCardSchema");
const BookHotel = (req, res, next) => {
  const userId = req.token.userId;
  const {
    firstName,
    lastName,
    email,
    country,
    phoneNumber,
    privateOrders,
    hotelId,
  } = req.body;

  const newBook = new BookModel({
    firstName,
    lastName,
    email,
    country,
    phoneNumber,
    privateOrders,
    userId: userId,
    hotelId,
  });

  newBook
    .save()
    .then((result) => {
      userCardModel
      .findOneAndUpdate(
        { userId: userId },
        { hotelId: hotelId },
        { new: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch(error=>{
        const err = new Error(error.message);
      err.status = 500;
      next(err);
      })
      res.status(201).json({
        success: true,
        message: "hotel booked successfully",
        Booked: result,
      });
    })
    .catch((error) => {
      const err = new Error(error.message);
      err.status = 500;
      next(err);
    });
};

const getBookedHotels = (req, res, next) => {
  BookModel.find({})
    .populate("userId", "firstName lastName email")
    .populate("hotelId", "-__v -image")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          message: "All hotels",
          Booked: result,
        });
      } else {
        res.status(401).json({
          message: "No reserved hotels yet",
        });
      }
    })
    .catch((error) => {
      const err = new Error(error.message);
      err.status = 500;
      next(err);
    });
};

module.exports = { BookHotel, getBookedHotels };
