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
 *      - Marca
 */
router.get("/", function (req, res, next) {
  const data = brandController.selectAll();
  if (data.error) {
    res.statusCode = 500;
    res.send({ status: "error", data: "Erro ao buscar marcas" });
  }

  res.statusCode = 200;
  res.send({ status: "ok", data: data });
});

/**
 * @swagger
 * /brands/create:
 *  post:
 *    summary: Cadastra uma marca
 *    parameters:
 *      - in: body
 *        name: Marca
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            senha:
 *              type: string
 *            nome:
 *              type: string
 *            cnpj:
 *              type: string
 *            telefone:
 *              type: string
 *            id_cargo:
 *              type: integer
 *            id_segmento:
 *              type: integer
 *            id_varejo:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Marca cadastrado com sucesso
 *      '400':
 *        description: Email informado já está sendo utilizado
 *      '500':
 *        description: Erro ao cadastrar marca
 *    tags:
 *      - Marca
 */

router.post("/create", function (req, res, next) {
  const data = brandController.createBrand(req.body);
  if (data.error) {
    res.statusCode = 500;
    res.send({ status: "error", data: "Erro ao criar marca" });
  }

  res.statusCode = 200;
  res.send({ status: "ok", data: data });
});

/**
 * @swagger
 * /brands/update-status:
 *  post:
 *    summary: Atualiza o status da marca
 *    parameters:
 *      - in: body
 *        name: Marca
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            status:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Status da marca atualizado com sucesso
 *      '500':
 *        description: Erro ao atualizar status da marca
 *    tags:
 *      - Marca
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
