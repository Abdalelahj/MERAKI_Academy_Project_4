const userCardModel = require("../models/userCardSchema");

const getInfo = (req, res) => {
  userCardModel
    .find({})
    .populate("userId")
    .populate("hotelId", "price title")
    .populate("flightId", "price company")
    .then((result) => {      
      if(result.length){
        res.status(200).json({
          message: "All info",
          secretInfo: result,
        });
      }
      else{
        res.status(200).json({
          message: "All info",
          secretInfo: "empty",
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

const updateInfo = (req, res, next) => {
  const userId = req.token.userId;
  const { flightId, hotelId } = req.body;
  userCardModel
    .findOneAndUpdate(
      { userId: userId },
      {
        flightId: flightId,
        hotelId: hotelId,
      },
      { new: true }
    )
    .then((result) => {
      res.status(202).json({
        success: true,
        updated: result,
      });
    })
    .catch((error) => {
      const err = new Error(error.message);
      err.status = 500;
      next(err);
    });
};

const deleteAll=(req,res)=>{
  userCardModel.deleteMany()
  .then(result=>{
    res.status(200).json({
      success:true,
      confirm:result
    })
  })
  .catch(error=>{
    const err = new Error(error.message);
    err.status = 500;
    next(err);
  })
}
module.exports = { getInfo, updateInfo,deleteAll };
