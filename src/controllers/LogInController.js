const { sequelize } = require("../database/connection");

module.exports = {
  async verifyLogin(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;
    var retorno = await sequelize.query(
      `select * from dbo.login where email = '${email}'`
    );
    var status = {};
    var data = JSON.parse(JSON.stringify(retorno[0]));
    if (!data[0]) {
      status.status = 0;
    } else if (data[0].senha != senha) {
      status.status = 1;
    } else {
      status.status = 2;
      status.usuario = email;
      status.cargo = data[0].id_cargo;
    }
    return res.json(status);
  },
};
