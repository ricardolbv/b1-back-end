const { sequelize } = require("../database/db");
const crypto = require("crypto");

const jwt = (req) => {
  const header = JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  });

  const payload = JSON.stringify({
    email: req.email,
    password: req.senha,
  });

  const base64Header = Buffer.from(header).toString("base64").replace(/=/g, "");
  const base64Payload = Buffer.from(payload)
    .toString("base64")
    .replace(/=/g, "");
  const secret = "toninhogostoso";

  const data = base64Header + "." + base64Payload;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");

  const signatureUrl = signature
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  console.log(`${base64Header}.${base64Payload}.${signatureUrl}`);
};

module.exports = {
  async verifyLogin(req) {
    var email = req.email;
    var senha = req.senha;
    var retorno = await sequelize.query(
      `select * from dbo.login where email = '${email}'`
    );
    var status = {};
    var data = JSON.parse(JSON.stringify(retorno[0]));
    if (!data[0]) {
      status.status = 0;
      return res.json(status);
    } else if (data[0].senha != senha) {
      status.status = 1;
      return res.json(status);
    } else {
      status.status = 2;
      status.usuario = email;
      status.senha = senha;
      status.cargo = data[0].id_cargo;
      jwt(status);
    }
  },
};
