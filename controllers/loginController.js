const db = require("../database/db");
const jwt = require("jsonwebtoken");
const secret = "b1";

const verifyLogin = async (req) => {
  var email = req.email;
  var senha = req.senha;
  var retorno = await db.query(
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
    var token = jwt.sign(
      {
        usuarioId: data[0].id,
        cargoId: data[0].id_cargo,
        email: data[0].email,
      },
      secret,
      { expiresIn: 1000 }
    );
    return token;
  }
};

module.exports = {
  verifyLogin,
};
