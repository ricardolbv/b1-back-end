var express = require("express");
var router = express.Router();
var retailController = require("../controllers/retailController");

//teste

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
    return res.send({ status: "error", data: data.error });
  }

  res.statusCode = 200;
  return res.send({ status: "ok", data: data });
});

/**
 * @swagger
 * /retail:
 *  post:
 *    summary: Cria um varejo
 *    parameters:
 *      - in: body
 *        name: Varejo
 *        schema:
 *          type: object
 *          properties:
 *            inscricao:
 *              type: string
 *            cnpj:
 *              type: string
 *            razao_social:
 *              type: string
 *            nome_fantasia:
 *              type: string
 *            telefone:
 *              type: string
 *            status:
 *              type: integer
 *            id_cargo:
 *              type: integer
 *            id_login:
 *              type: integer
 *            id_segmento:
 *              type: integer
 *            created_at:
 *              type: string
 *            updated_at:
 *              type: string
 *    responses:
 *      '200':
 *        description:  Varejo criado com sucesso
 *      '400':
 *        description: Erro ao criar varejo
 *      '500':
 *        description: Erro ao criar varejo
 *    tags:
 *      - varejo
 */
router.post("/", async (req, res, next) => {
  const data = await retailController.insert(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

module.exports = router;
