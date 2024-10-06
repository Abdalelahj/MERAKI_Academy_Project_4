const BookFlightModel = require("../models/BookFlightSchema");
const flightModel = require("../models/FlightSchema");

const bookFlight = async (req, res) => {
  const userId = req.token.userId;

  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    gender,
    birthDate,
    nationality,
    passportNumber,
    expiry,
    flightId,
  } = req.body;

  newBook = new BookFlightModel({
    email,
    phoneNumber,
    firstName,
    lastName,
    gender,
    birthDate,
    nationality,
    passportNumber,
    expiry,
    flightId,
    user: userId
  });

  try {
    const ticket = await newBook.save();
    res.status(201).json({
      success: true,
      msg: "ticket booked successfully",
      ticket: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error.message,
    });
  }
};

const getBookedFlights = (req, res) => {
  BookFlightModel.find({})
    .populate("flightId","-__v")
    .populate("user","-__v -password -userName")
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          message: "All your reserved flights",
          Booked: result,
        });
      } else {
        res.status(401).json({
          message: "No reserved flights yet",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: err.message,
      });
    });
};
module.exports = { bookFlight, getBookedFlights };
