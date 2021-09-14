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
 router.get("/", async (req, res, next) => {
    const data = await campaignController.selectAll();
    if (data.error) {
      res.statusCode = 500;
      return res.send({ status: "error", data: data.error });
    }
  
    res.statusCode = 200;
    return res.send({ status: "ok", data: data });
  });