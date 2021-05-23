var express = require("express");
var router = express.Router();
var retailController = require("../controllers/retailController");

/**
 * @swagger
 * /retail:
 *  get:
 *    summary: Retorna todos os varejos
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
 * /retail/create:
 *  post:
 *    summary: Cadastra um varejo
 *    parameters:
 *      - in: body
 *        name: Varejo
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            senha:
 *              type: string
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
 *            id_cargo:
 *              type: integer
 *            id_segmento:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Varejo cadastrado com sucesso
 *      '400':
 *        description: Email informado já está sendo utilizado
 *      '500':
 *        description: Erro ao cadastrar varejo
 *    tags:
 *      - varejo
 */
router.post("/create", async (req, res, next) => {
  const data = await retailController.createRetail(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

/**
 * @swagger
 * /retail/update-status:
 *  post:
 *    summary: Atualiza o status do varejo
 *    parameters:
 *      - in: body
 *        name: Varejo
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            status:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Varejo cadastrado com sucesso
 *      '500':
 *        description: Erro ao cadastrar varejo
 *    tags:
 *      - varejo
 */
router.post("/update-status", async (req, res, next) => {
  const data = await retailController.updateStatusRetail(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

module.exports = router;
