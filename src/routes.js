const express = require("express");
const routes = express.Router();
const IndexController = require("./controllers/IndexController");
const LogInController = require("./controllers/LogInController");

routes.use("/index", IndexController.index);

routes.post("/login/verification", LogInController.verifyLogin);

module.exports = routes;
