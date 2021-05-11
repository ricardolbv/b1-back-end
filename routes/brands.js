var express = require("express");
var router = express.Router();
var brandController = require("../controllers/brandController");

/**
 * @swagger
 * /brands:
 *  get:
 *    summary: Retorna todas as marcas
 *    responses:
 *      '200':
 *        description: Retorna todos as marcas do sistema
 *      '500':
 *        description: Erro ao retornar todas as marcas
 *    tags:
 *      - marca
 */
router.get("/", function (req, res, next) {
  const data = brandController.selectAll();
  if (data.error) {
    res.statusCode = 500;
    res.send({ status: "error", data: "Erro ao buscar usuarios" });
  }

  res.statusCode = 200;
  res.send({ status: "ok", data: data });
});

module.exports = router;
