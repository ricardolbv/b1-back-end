var express = require("express");
var router = express.Router();
var retailController = require("../controllers/segmentController");

/**
 * @swagger
 * /segment:
 *  get:
 *    summary: Retorna todos os segmentos
 *    responses:
 *      '200':
 *        description: Retorna todos os segmentos do sistema
 *      '500':
 *        description: Erro ao retornar todos os segmentos
 *    tags:
 *      - Segmento
 */
router.get("/", async (req, res, next) => {
  const data = await retailController.selectSegment();
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }

  res.statusCode = 200;
  return res.send({ status: "ok", data: data });
});

module.exports = router;
