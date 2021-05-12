const express = require("express");
const indexRouter = require("./index");
const usersRouter = require("./users");
const brandRouter = require("./brands");
const loginRouter = require("./login");
const retailRouter = require("./retail");
const profileRouter = require("./profile");

module.exports = () => {
  const router = express.Router();
  router.use("/brands", brandRouter);
  router.use("/users", usersRouter);
  router.use("/", indexRouter);
  router.use("/login", loginRouter);
  router.use("/retail", retailRouter);
  router.use("/profile", profileRouter);

  return router;
};
