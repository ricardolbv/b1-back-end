const db = require("../database/db");
const jwt = require("jsonwebtoken");
const secret = "b1";
// VERIFICAR STATUS LOGIN
const verifyLogin = async (req) => {
  try{
      var email = req.email;
      var senha = req.senha;
      var retorno = await db.query(
        `select * 
        from dbo.login 
        where email = '${email}'
        and senha = '${senha}''`
      );

      var data = JSON.parse(JSON.stringify(retorno[0]));

 


     /* const cargoSql = await db.query(
        `SELECT 
           c.[descricao]
        FROM [dbo].[cargo] c
        WHERE c.id = ${data[0].id_cargo}`
      );

      const cargo = JSON.parse(JSON.stringify(cargoSql[0]));



      const user = {};

      if (cargo[0].descricao == "Suporte") {
        user = await db.query(
          `SELECT 
          [status]
          FROM [dbo].[suporte]
          WHERE [id_login] = ${data[0].id}`
        );
      } 
      else {
        if (cargo[0].descricao == "Varejo") {
          
            
        } else {
          if (cargo[0].descricao == "Marca") {
           
          }
        }
      }
      

      user = JSON.parse(JSON.stringify(user[0]));

      console.log("AQUII===================> ",user[0].status);

      
      if(!user[0].status){

         return {error2: 'Usuário inexistente ou senha inválida'};
      }*/

    
      var token = jwt.sign({
            usuarioId: data[0].id,
            cargoId: data[0].id_cargo,
            email: data[0].email,
      },
      secret,
          { expiresIn: 1000 }
      );
        
      return token;

      
    } catch(error){
      return {error: 'Usuário inexistente ou senha inválida'};
    }
};

module.exports = {
  verifyLogin,
};
