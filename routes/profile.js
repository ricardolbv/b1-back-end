var express = require("express");
var router = express.Router();
var profileController = require("../controllers/profileController");

/**
 * @swagger
 * /profile:
 *  post:
 *    summary: Retorna o perfil do usuário logado.
 *    parameters:
 *    responses:
 *      '200':
 *        description: Retorna o perfil do usuário logado
 *      '500':
 *        description: Erro ao retornar perfil do usuário logado
 *    tags:
 *      - Perfil
 */

router.post("/", async (req, res, next) => {
  const data = await profileController.selectPerfil(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

module.exports = router;
