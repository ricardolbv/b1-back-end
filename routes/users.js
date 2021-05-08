var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retorna todos os campeonatos
 *    responses:
 *      '200':
 *        description: Retorna todos os Campeonatos criados
 *    tags:
 *      - campeonatos 
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
