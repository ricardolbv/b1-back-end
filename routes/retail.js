var express = require("express");
var router = express.Router();
var retailController = require("../controllers/retailController");

/**
 * @swagger
 * /retail/{usuarioId}:
 *  get:
 *    summary: Retorna todos os varejos
 *    responses:
 *      '200':
 *        description: Retorna todos as varejos do sistema
 *      '404':
 *        description: Id do usuário não fornecido
 *      '500':
 *        description: Erro ao retornar todos os varejos
 *    parameters:
 *      - in: path
 *        name: usuarioId
 *        schema:
 *          type: integer
 *    tags:
 *      - Varejo
 */
router.get("/:usuarioId", async (req, res, next) => {
  if(!req.params.usuarioId){
    res.statusCode = 404;
    return res.send({ status: "Id do usuário não fornecido"});
  }

  const data = await retailController.selectAll(req.params.usuarioId);
  
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
 *            status:
 *              type: integer
 *    responses:
 *      '200':
 *        description:  Varejo cadastrado com sucesso
 *      '400':
 *        description: Email informado já está sendo utilizado
 *      '500':
 *        description: Erro ao cadastrar varejo
 *    tags:
 *      - Varejo
 */
router.post("/create", async (req, res, next) => {
  const data = await retailController.createRetail(req.body);
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
 *        description:  Status do varejo atualizado com sucesso
 *      '500':
 *        description: Erro ao atualizar status do varejo
 *    tags:
 *      - Varejo
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

/**
 * @swagger
 * /retail/delete:
 *  post:
 *    summary: Excluí o usuário varejo
 *    parameters:
 *      - in: body
 *        name: Varejo
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *    responses:
 *      '200':
 *        description:  Varejo excluído com sucesso
 *      '500':
 *        description: Erro ao excluir varejo
 *    tags:
 *      - Varejo
 */
router.post("/delete", async (req, res, next) => {
  const data = await retailController.deleteRetail(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

/**
 * @swagger
 * /retail/update-retail:
 *  post:
 *    summary: Atualiza um varejo
 *    parameters:
 *      - in: body
 *        name: Varejo
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            update_senha:
 *              type: string
 *            update_inscricao:
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
 *        description: Erro ao atualizar varejo
 *    tags:
 *      - Varejo
 */
router.post("/update-retail", async (req, res, next) => {
  const data = await retailController.updateRetail(req.body);
  if (data.error) {
    res.statusCode = 500;
    return res.send({ status: "error", data: data.error });
  }
  res.statusCode = 200;
  return res.send({ status: "ok", data: data.data });
});

module.exports = router;
