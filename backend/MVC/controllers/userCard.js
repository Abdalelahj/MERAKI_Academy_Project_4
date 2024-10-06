const userCardModel = require("../models/userCardSchema")


const getInfo =(req,res)=>{
userCardModel.find({})
.populate("userId", "firstName lastName email")
.populate("hotelId", "price title")
.populate("flightId", "price company")
.then(result=>{
    res.status(200).json({
        message: "All info",
        secretInfo: result,
      });
})
.catch(err=>{
    res.status(500).json({
        success: false,
        message: `Server Error`,
        error: err.message,
      });
})
}



module.exports={getInfo}