const paymentModel = require("../models/paymentSchema");
const userCardModel = require("../models/userCardSchema");
const pay = async (req, res) => {
  const userId = req.token.userId;
  const { cardNumber, name, expiry, CCV } = req.body;
  userCardModel
    .findOne({ userId: userId })
    .populate("userId", "firstName lastName email")
    .populate("hotelId", "price title")
    .populate("flightId", "price company")
    .then(async (result) => {
      const newPayment = new paymentModel({
        cardNumber,
        name,
        expiry,
        CCV,
        hotelId: result.hotelId,
        flightId: result.flightId,
        userId: result.userId,
      });
      try {
        await newPayment.save();
        res.status(201).json({
          success: true,
          message: "payment was transferred successfully",
          payment: newPayment,
          total: result,
        });
        userCardModel
          .findOneAndUpdate(
            { userId: userId },
            { hotelId: null, flightId: null },
            { new: true }
          )
          .then((result) => {
            console.log("after Removal", result);
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: `Server Error`,
              error: err.message,
            });
          });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: error.message,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getPayment = async (req, res) => {
  try {
    const result = await paymentModel
      .find({})
      .populate("userId", "firstName lastName email")
      .populate("hotelId", "price")
      .populate("flightId", "price");
    if (result.length) {
      res.status(200).json({
        message: "your payment",
        total_price: result.map((item) => {
          if (item.hotelId && item.flightId) {
            return (
              Number.parseInt(item.hotelId.price) +
              Number.parseInt(item.flightId.price)
            );
          } else if (item.hotelId) {
            return Number.parseInt(item.hotelId.price);
          } else {
            return Number.parseInt(item.flightId.price);
          }
        }),
        payment: result,
      });
    } else {
      res.status(200).json({
        message: "No current payment",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: error.message,
    });
  }
};

module.exports = { pay, getPayment };
