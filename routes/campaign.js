var express = require("express");
var router = express.Router();
var campaignController = require("../controllers/campaignController");


/**
 * @swagger
 * /campaign:
 *  get:
 *    summary: Retorna todos as campanhas
 *    responses:
 *      '200':
 *        description: Retornado todas as campanhas do sistema
 *      '500':
 *        description: Erro ao retornar todas as campanhas
 *    tags:
 *      - Campanha
 */
 router.post("/", async (req, res, next) => {
    const data = await campaignController.selectAll(req.body);
    if (data.error) {
      res.statusCode = 500;
      return res.send({ status: "error", data: data.error });
    }
  
    res.statusCode = 200;
    return res.send({ status: "ok", data: data });
  });


  /**
 * @swagger
 * /campanha/create:
 *  post:
 *    summary: Cadastra uma campanha
 *    parameters:
 *      - in: body
 *        name: Campanha
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


  module.exports = router;