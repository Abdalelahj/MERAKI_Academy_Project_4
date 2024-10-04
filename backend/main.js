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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
