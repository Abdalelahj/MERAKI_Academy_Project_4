const express = require("express");
const paymentRouter = express.Router();
const { pay ,getPayment} = require("../controllers/payment");
const auth = require("../middleware/authentication");

paymentRouter.post("/", auth, pay);
paymentRouter.get("/", auth, getPayment);


module.exports=paymentRouter;