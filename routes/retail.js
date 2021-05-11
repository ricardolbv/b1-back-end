var express = require("express");
var router = express.Router();
var retailController = require("../controllers/retailController");

/**
 * @swagger
 * /retail:
 *  get:
 *    summary: Retorna todas as marcas
 *    responses:
 *      '200':
 *        description: Retorna todos as varejos do sistema
 *      '500':
 *        description: Erro ao retornar todos os varejos
 *    tags:
 *      - varejo
 */
router.get("/", async (req, res, next) => {
  const data = await retailController.selectAll();
  if (data.error) {
    res.statusCode = 500;
    res.send({ status: "error", data: data.error });
  }

  res.statusCode = 200;
  res.send({ status: "ok", data: data });
});

module.exports = router;