const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  privateOrders: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" ,required:true },
  hotelId:{type:mongoose.Schema.Types.ObjectId,ref:"Hotel",required:true}
});

module.exports = new mongoose.model("BookHotel", hotelSchema);
