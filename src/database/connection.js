const Sequelize = require("sequelize");
const sequelize = new Sequelize("tcc", "tcc", "bone123!", {
  host: "serverb1.database.windows.net",
  dialect: "mssql",
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Conectando com sucesso!");
  })
  .catch(function (erro) {
    console.log("Falha ao se conectar: " + erro);
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
