const db = require("../database/db");
const jwt = require("jsonwebtoken");
const secret = "b1";

const verifyLogin = async (req) => {
  try{
      var email = req.email;
      var senha = req.senha;
      var retorno = await db.query(
        `select * from dbo.login where email = '${email}'`
      );
      var data = JSON.parse(JSON.stringify(retorno[0]));
      console.log(data);

      if (!data[0] || data[0].senha != senha)
        return {error: 'Usuário inexistente ou senha inválida'};

      var token = jwt.sign({
            usuarioId: data[0].id,
            cargoId: data[0].id_cargo,
            email: data[0].email,
          },
          secret,
          { expiresIn: 1000 }
        );
        return token;

    } catch(err){
      return {error: 'Usuário inexistente ou senha inválida'};
    }
};

module.exports = {
  verifyLogin,
};
