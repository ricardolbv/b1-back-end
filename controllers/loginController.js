const db = require("../database/db");
const jwt = require("jsonwebtoken");
const secret = "b1";
// VERIFICAR STATUS LOGIN
const verifyLogin = async (req) => {
  try{
      var email = req.email;
      var senha = req.senha;
      var retorno = await db.query(
        `select * from dbo.login where email = '${email}'`
      );

      var data = JSON.parse(JSON.stringify(retorno[0]));
      const cargoSql = await db.query(
        `SELECT 
           c.[descricao]
        FROM [dbo].[cargo] c
        WHERE c.id = ${data[0].id_cargo}`
      );
      const cargo = JSON.parse(JSON.stringify(cargoSql[0]));

      console.log(cargo);


      if (cargo[0].descricao == "Suporte") {
      
      } 
      else {
        if (cargo[0].descricao == "Varejo") {
          
            
        } else {
          if (cargo[0].descricao == "Marca") {
           
          }
        }
      }
    

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
