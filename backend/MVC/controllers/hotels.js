const { log } = require("console");
const hotelsModel = require("../models/HotelsSchema");
const fs = require("fs");

const addHotel = async (req, res) => {
  //   const readFile =  () => {
  //     try {
  //       const data =  fs.readFileSync("MVC/controllers/images.txt");
  //      return data.toString()

  //     } catch (err) {
  //       throw err;
  //     }
  //   };

  const {
    image,
    destination,
    dateFrom,
    dateTo,
    title,
    rating,
    numberOfReviews,
    distanceFromCenter,
    numberOfRooms,
    price,
  } = req.body;

  const newHotel = new hotelsModel({
    image,
    destination,
    dateFrom,
    dateTo,
    title,
    rating,
    numberOfReviews,
    distanceFromCenter,
    numberOfRooms,
    price,
  });

  try {
    await newHotel.save();
    res.status(201).json({
      success: true,
      message: "hotel created successfully",
      result: newHotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      error: error.message,
    });
  }
};

const getHotels = (req, res) => {
  const { destination, dateFrom, numberOfRooms } = req.body;

  hotelsModel
    .find({ destination, dateFrom, numberOfRooms })
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          search: result,
        });
      }else{
        res.status(401).json({
            message: "No hotels found",
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

module.exports = { addHotel, getHotels };
