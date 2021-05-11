const Sequelize = require("sequelize");
const sequelize = new Sequelize("tcc", "tcc", "bone123!", {
  host: "serverb1.database.windows.net",
  dialect: "mssql",
});


module.exports = sequelize;
