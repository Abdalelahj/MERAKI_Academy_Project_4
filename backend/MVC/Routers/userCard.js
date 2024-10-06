const express = require("express");

const userCardRouter = express.Router();

const { getInfo, updateInfo } = require("../controllers/userCard");

const auth = require("../middleware/authentication");
userCardRouter.get("/", auth, getInfo);
userCardRouter.post("/", auth, updateInfo);

module.exports = userCardRouter;
