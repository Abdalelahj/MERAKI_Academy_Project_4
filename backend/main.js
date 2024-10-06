const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./MVC/models/db");

app.use(express.json());
const userRouter = require("./MVC/Routers/user");
app.use("/user", userRouter);

const flightRouter = require("./MVC/Routers/Flight");
app.use("/flight", flightRouter);

const BookFlightRouter = require("./MVC/Routers/BookFlight");
app.use("/book", BookFlightRouter);

const BookHotelRouter = require("./MVC/Routers/BookHotel");
app.use("/bookHotel", BookHotelRouter);
const PORT = 5000;

const hotelRouter = require("./MVC/Routers/hotels");
app.use("/hotel", hotelRouter);

const paymentRouter =require("./MVC/Routers/payment")
app.use("/pay",paymentRouter)

app.use((err,req,res,next)=>{
  res.status(err.status).json({
    message:err.message
  })
})
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
