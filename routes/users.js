var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retorna todos os usuarios
 *    responses:
 *      '200':
 *        description: Retorna todos os usuarios do sistema
 *      '500':
 *        description: Erro ao retornar todos os usuarios
 *    tags:
 *      - usuarios
 */
router.get('/', function(req, res, next) {
  const data = userController.selectAll();
  if (data.error) {
    res.statusCode = 500
    res.send({ status: 'error', data: 'Erro ao buscar usuarios' })
  }

  res.statusCode = 200
  res.send({ status: 'ok', data: data});
});

/**
 * @swagger
 * /users:
 *  post:
 *    summary: Cria um usuario
 *    parameters:
 *      - in: body
 *        name: Usuario
 *        schema:
 *          type: object
 *          properties:
 *            nome:
 *              type: string
 *            id:
 *              type: integer
 *    responses:
 *      '200':
 *        description: Usuario criado com sucesso
 *      '400':
 *        description: Já existe um usuario com o nome fornecido
 *      '500':
 *        description: Erro ao criar usuario
 *    tags:
 *      - usuarios
 */
router.post('/', (req, res, next) => {
  data = userController.insert(req.body);
  if (data.error){
    res.statusCode = 500
    res.send({ status: 'error', data: 'Erro ao inserir usuario' })
  }
  res.statusCode = 200
  res.send({ status: 'ok', data: data.data});
})

module.exports = router;
