const mongoose = require("mongoose")

const userCard= new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref :"User"},
    flightId:{type:mongoose.Schema.Types.ObjectId,ref :"Flights"},
    hotelId:{type:mongoose.Schema.Types.ObjectId,ref :"Hotel"}
})


module.exports=new mongoose.model("userCard",userCard)