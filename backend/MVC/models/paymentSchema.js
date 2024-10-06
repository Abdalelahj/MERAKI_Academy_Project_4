const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true },
  name: { type: String, required: true },
  expiry: { type: String, required: true },
  CCV: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
  },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flights" },
});

module.exports = new mongoose.model("Payment", paymentSchema);
