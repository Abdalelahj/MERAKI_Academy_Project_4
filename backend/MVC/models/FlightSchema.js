const mongoose = require("mongoose");

const FLightsSchema = new mongoose.Schema({
  destinationFrom: { type:String ,required:true},
  destinationTo: { type:String ,required:true},
  dateLeaving: { type:Date ,required:true},
  dateReturning: { type:Date},
  timeFrom: { type:String},
  timeTo: { type:String},
  company: { type:String},
  price:{type:String},
});

module.exports = new mongoose.model("Flights", FLightsSchema);
