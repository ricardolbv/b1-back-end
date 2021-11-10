var express = require("express");
var router = express.Router();
var profileController = require("../controllers/profileController");
const secret = "b1";
const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).end();
    req.usuarioId = decoded.usuarioId;
    req.cargoId = decoded.cargoId;
    next();
  });
}

/**
 * @swagger
 * /profile/{usuarioId}:
 *  get:
 *    summary: Retorna o perfil do usuário logado.
 *    responses:
 *      '200':
 *        description: Retornado perfil com sucesso
 *      '404':
 *        description: Id do usuário não fornecido
 *      '500':
 *        description: Erro ao retornar perfil
 *    parameters:
 *      - in: path
 *        name: usuarioId
 *        schema:
 *          type: integer
 *    tags:
 *      - Perfil
 */

router.get("/:usuarioId", async (req, res, next) => {

  if(!req.params.usuarioId){
    res.statusCode = 404;
    return res.send({ status: "Id do usuário não fornecido"});
  }

  const data = await profileController.selectPerfil(req.params.usuarioId);

  if(data == null){
    res.statusCode = 404;
    return res.send({ status: "Perfil não encontrado"});
  }

  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: "Erro ao retornar perfil" });
  }

  res.statusCode = 200;
  return res.send({ status: "ok", data: data });
});

/**
 * @swagger
 * /profile/update-password:
 *  post:
 *    summary: Altera a senha do usuário logado.
 *    parameters:
 *      - in: body
 *        name: Perfil
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            senha:
 *              type: string
 *            nova_senha:
 *              type: string
 *    responses:
 *      '200':
 *        description: Retorna o perfil do usuário logado
 *      '500':
 *        description: Erro ao retornar perfil do usuário logado
 *    tags:
 *      - Perfil
 */
router.post("/update-password", async (req, res, next) => {
  const data = await profileController.updatePassword(req);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

module.exports = router;
