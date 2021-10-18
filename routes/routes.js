const express = require("express");
const indexRouter = require("./index");
const usersRouter = require("./users");
const brandRouter = require("./brand");
const loginRouter = require("./login");
const retailRouter = require("./retail");
const profileRouter = require("./profile");
const segmentRouter = require("./segment");
const campaignRouter = require("./campaign");

module.exports = () => {
  const router = express.Router();
  router.use("/brand", brandRouter);
  router.use("/users", usersRouter);
  router.use("/", indexRouter);
  router.use("/login", loginRouter);
  router.use("/retail", retailRouter);
  router.use("/profile", profileRouter);
  router.use("/segment", segmentRouter);
  router.use("/campaign", campaignRouter)

  return router;
};
