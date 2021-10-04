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
 * /campaign/create:
 *  post:
 *    summary: Cadastra uma campanha
 *    parameters:
 *      - in: body
 *        name: Campanha
 *        schema:
 *          type: object
 *          properties:
 *            campanha:
 *              type: string
 *            descricao:
 *              type: string
 *            data_de_inicio:
 *              type: datetime
 *            data_de_fim:
 *              type: datetime
 *            id_marca:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Campanha cadastrada com sucesso
 *      '500':
 *        description: Erro ao cadastrar campanha
 *    tags:
 *      - Marca
 */
router.post("/create", async (req, res, next) => {
  const data = await campaignController.createCampaign(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});


/**
 * @swagger
 * /campaign/delete:
 *  post:
 *    summary: Excluí a campanha selecionada
 *    parameters:
 *      - in: body
 *        name: Varejo
 *        schema:
 *          type: object
 *          properties:
 *            idCampanha:
 *              type: integer
 *    responses:
 *      '200':
 *        description: Campanha excluída com sucesso
 *      '500':
 *        description: Erro ao excluir campanha
 *    tags:
 *      - Campanha
 */
 router.post("/delete", async (req, res, next) => {
  const data = await campaignController.deleteCampaign(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});






router.post("/update", async (req, res, next) => {
  const data = await campaignController.updateCampaign(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});


module.exports = router;