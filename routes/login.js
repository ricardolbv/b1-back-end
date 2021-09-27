var express = require("express");
var router = express.Router();
var loginController = require("../controllers/loginController");

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Valida usuario
 *    tags:
 *      - Usuarios
 *    parameters:
 *      - in: body
 *        name: Login
 *        schema:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          senha: 
 *            type: string
 *    responses:
 *      '200':
 *        description: ok
 *      '500':
 *        description: Erro ao validar usuario
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
