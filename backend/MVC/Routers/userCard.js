const express = require("express");

const userCardRouter = express.Router();

const { getInfo, updateInfo ,deleteAll} = require("../controllers/userCard");

const auth = require("../middleware/authentication");
userCardRouter.get("/", auth, getInfo);
userCardRouter.post("/upd", auth, updateInfo);
userCardRouter.delete("/dlt", auth, deleteAll);

module.exports = userCardRouter;
