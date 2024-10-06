const mongoose=require("mongoose")

const hotelSchema=new mongoose.Schema({
image:{type:String},
destination:{type:String,required:true},
dateFrom:{type:String,required:true},
dateTo:{type:String},
title:{type:String},
rating:{type:Number},
numberOfReviews:{type:Number},
distanceFromCenter:{type:String},
numberOfRooms:{type:String ,required:true},
price:{type:String},
})



module.exports=new mongoose.model("Hotel",hotelSchema)