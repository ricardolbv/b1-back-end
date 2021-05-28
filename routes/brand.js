var express = require("express");
var router = express.Router();
var brandController = require("../controllers/brandController");

router.get("/", async (req, res, next) => {
  const data = await brandController.selectAll();
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }

  res.statusCode = 200;
  return res.send({ status: "ok", data: data });
});

router.post("/create", async (req, res, next) => {
  const data = await brandController.createBrand(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  if (data.errorEmail) {
    res.statusCode = 400;
    return res.send({ status: "error", data: data.errorEmail });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

module.exports = router;
