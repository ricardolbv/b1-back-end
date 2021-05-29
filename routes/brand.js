var express = require("express");
var router = express.Router();
var brandController = require("../controllers/brandController");

/**
 * @swagger
 * /brand:
 *  get:
 *    summary: Retorna todos as marcas
 *    responses:
 *      '200':
 *        description: Retornado todas as marcas do sistema
 *      '500':
 *        description: Erro ao retornar todas as marcas
 *    tags:
 *      - Marca
 */
router.get("/", async (req, res, next) => {
  const data = await brandController.selectAll();
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }

  res.statusCode = 200;
  return res.send({ status: "ok", data: data });
});

/**
 * @swagger
 * /brand/create:
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
 *            status:
 *              type: integer
 *            id_cargo:
 *              type: integer
 *            id_segmento:
 *              type: integer
 *            id_varejo:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Marca cadastrada com sucesso
 *      '400':
 *        description: Email informado já está sendo utilizado
 *      '500':
 *        description: Erro ao cadastrar marca
 *    tags:
 *      - Marca
 */
router.post("/create", async (req, res, next) => {
  const data = await brandController.createBrand(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  if (data.errorEmail) {
    res.statusCode = 400;
    return res.send({ status: "error", data: data.errorEmail });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

/**
 * @swagger
 * /brand/update-status:
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
  const data = await brandController.updateStatusBrand(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

/**
 * @swagger
 * /brand/delete:
 *  post:
 *    summary: Excluí a marca
 *    parameters:
 *      - in: body
 *        name: Marca
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *    responses:
 *      '200':
 *        description:  Marca excluída com sucesso
 *      '500':
 *        description: Erro ao excluir marca
 *    tags:
 *      - Marca
 */
router.post("/delete", async (req, res, next) => {
  const data = await brandController.deleteBrand(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

/**
 * @swagger
 * /brand/update-brand:
 *  post:
 *    summary: Atualiza uma marca
 *    parameters:
 *      - in: body
 *        name: Marca
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            update_nome:
 *              type: string
 *            update_cnpj:
 *              type: string
 *            update_telefone:
 *              type: string
 *            update_id_segmento:
 *              type: integer
 *            update_id_varejo:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Marca alterada com sucesso
 *      '500':
 *        description: Erro ao alterar marca
 *    tags:
 *      - Marca
 */
router.post("/update-brand", async (req, res, next) => {
  const data = await brandController.updateBrand(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

module.exports = router;
