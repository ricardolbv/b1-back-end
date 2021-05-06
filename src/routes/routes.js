const express = require("express");
const varejoRouter = require('./varejo');
//const IndexController = require("../controllers/IndexController");
//const LogInController = require("../controllers/LogInController");

//routes.use("/index", IndexController.index);

//routes.post("/login/verification", LogInController.verifyLogin);

module.exports = () => {
    const router = express.Router();
    router.use('/varejo', varejoRouter);

    return router;
}

