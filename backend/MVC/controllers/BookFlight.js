const BookFlightModel = require("../models/BookFlightSchema");
const flightModel = require("../models/FlightSchema");

const bookFlight = async (req, res) => {
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
  });
  newBook
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "ticket booked successfully",
        ticket: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error.message,
      });
    });
};

module.exports = { bookFlight };
