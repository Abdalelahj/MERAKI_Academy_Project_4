const mongoose = require("mongoose");

const BookFlightSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String ,required:true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  birthDate: { type: String, required: true },
  nationality: { type: String ,required:true},
  passportNumber: { type:String ,required:true},
  expiry: { type: String,required:true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flights" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = new mongoose.model("BookFlight", BookFlightSchema);
