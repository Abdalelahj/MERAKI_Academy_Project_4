const { log } = require("console");
const hotelsModel = require("../models/HotelsSchema");

const addHotel = async (req, res) => {
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

  hotelsModel
    .find({})
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          search: result,
        });
      }else{
        res.status(401).json({
            message: "No hotels try found",
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

const getHotelsById =(req,res)=>{
const id =req.params.id
hotelsModel.find({_id:id})
.then(result=>{
  if (result.length) {
    res.status(200).json({
      success: true,
      search: result,
    });
  }else{
    res.status(401).json({
        message: "No hotels try found",
      });
  }  
})
.catch(err=>{
  res.status(500).json({
    success: false,
    message: `Server Error`,
    error: err.message,
  });
})
}



module.exports = { addHotel, getHotels ,getHotelsById};
