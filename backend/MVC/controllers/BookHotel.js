const BookModel=require("../models/BHotelSchema")

const BookHotel = (req, res ,next) => {
  const userId = req.token.userId;
  const {
    firstName,
    lastName,
    email,
    country,
    phoneNumber,
    privateOrders,
    hotelId
  } = req.body;

  const newBook = new BookModel({
    firstName,
    lastName,
    email,
    country,
    phoneNumber,
    privateOrders,
    userId: userId,
    hotelId
  });

  newBook
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "hotel booked successfully",
        Booked: result,
      });
    })
    .catch((error) => {
      const err =new Error(error.message)
      err.status=500
      next(err)
      // res.status(500).json({
      //   success: false,
      //   message: `Server Error`,
      //   error: err.message
      // });
    });
};

const getBookedHotels = (req, res) => {
  BookModel
    .find({})
    .populate("user","firstName lastName email")
    .populate("hotelId","-__v -image")
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
    .catch(error=>{
      const err =new Error(error.message)
      err.status=500
      next(err)
    })
    
};


module.exports = { BookHotel,
  getBookedHotels
 };
