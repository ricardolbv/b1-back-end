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
 *      '404':
 *        description: Id do usuário não fornecido
 *      '500':
 *        description: Erro ao retornar todas as campanhas
 *    parameters:
 *      - in: path
 *        name: usuarioId
 *        schema:
 *          type: integer
 *    tags:
 *      - Campanha
 */
 router.get("/:usuarioId", async (req, res, next) => {

    if(!req.params.usuarioId){
      res.statusCode = 404;
      return res.send({ status: "Id do usuário não fornecido"});
    }
    
    console.log(req.params.usuarioId);
    const data = await campaignController.selectAll(req.params.usuarioId);
    
    if(data == null){
      res.statusCode = 404;
      return res.send({ status: "Campanha não encontrada"});
    }

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




/**
 * @swagger
 * /campaign/update:
 *  post:
 *    summary: Atualiza uma campanha
 *    parameters:
 *      - in: body
 *        name: Campanha
 *        schema:
 *          type: object
 *          properties:
 *            idCampanha:
 *              type: integer
 *            update_Campanha:
 *              type: string
 *            update_Descricao:
 *              type: string
 *            update_cnpj:
 *              type: string
 *            update_razao_social:
 *              type: string
 *            update_nome_fantasia:
 *              type: string
 *            update_telefone:
 *              type: string
 *            update_id_segmento:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Varejo atualizado com sucesso
 *      '500':
 *        description: Erro ao atualizar campanha
 *    tags:
 *      - Campanha
 */
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