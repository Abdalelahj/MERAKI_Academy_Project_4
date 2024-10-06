const flightModel = require("../models/FlightSchema");

const flights = (req, res) => {
  const {
    destinationFrom,
    destinationTo,
    dateLeaving,
    dateReturning,
    timeFrom,
    timeTo,
    company,
    price,
  } = req.body;

  const newFlight = new flightModel({
    destinationFrom,
    destinationTo,
    timeFrom,
    timeTo,
    dateLeaving,
    dateReturning,
    company,
    price,
  });
  newFlight
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "flight created successfully",
        flight: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getFlights = (req, res) => {
  const { destinationFrom, destinationTo, dateLeaving, dateReturning } =
    req.body;
  flightModel
    .find({ destinationFrom, destinationTo, dateLeaving, dateReturning })
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          flight: result,
        });
      } else {
        res.status(404).json({
          flight: "No result found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const getSingleFlights = (req, res) => {
  const { destinationFrom, destinationTo, dateLeaving } = req.body;
  flightModel
    .find({ destinationFrom, destinationTo, dateLeaving })
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          flight: result,
        });
      } else {
        res.status(404).json({
          flight: "No result found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = { flights, getFlights, getSingleFlights };
