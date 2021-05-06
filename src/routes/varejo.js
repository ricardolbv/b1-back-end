var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /varejo:
 *  get:
 *    summary: Retorna todos os grupos
 *    responses:
 *      '200':
 *        description: Retorna todos os Varejos cadastrados
 *      '500':
 *        description: Erro ao retornar Varejos
 *    tags:
 *      - grupos
 */
 router.get('/', async (req, res, next) => {
    res.statusCode = 200;
    if (res.statusCode = 500)
        return res.json({ status: 'error', data: 'Hey' })
    return res.json({ status : 'ok', data: 'Ola'});
})

module.exports = router;