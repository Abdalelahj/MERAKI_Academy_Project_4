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

const updateInfo =(req,res,next)=>{
    const userId=req.token.userId
    const{flightId ,hotelId}=req.body
    userCardModel.findOneAndUpdate({userId:userId},{
        flightId:flightId,
        hotelId:hotelId
    },
{new:true})
.then(result=>{
    res.status(202).json({
        success:true,
        updated :result
    })
})
.catch(error=>{
    const err = new Error(error.message);
    err.status = 500;
    next(err);
})
}

module.exports={getInfo,updateInfo}