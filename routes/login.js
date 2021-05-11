var express = require("express");
var router = express.Router();
var loginController = require("../controllers/loginController");

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Valida usuario
 *    responses:
 *      '200':
 *        description: Retorna todos os usuarios do sistema
 *      '500':
 *        description: Erro ao retornar todos os usuarios
 *    tags:
 *      - usuarios
 */
router.post("/", async (req, res, next) => {
  const data = await loginController.verifyLogin(req.body);
  if (data.error) {
    res.statusCode = 500;
    res.send({ status: "error", data: "Erro ao validar usuario" });
  }

  res.statusCode = 200;
  res.send({ status: "ok", data: data });
});

module.exports = router;
