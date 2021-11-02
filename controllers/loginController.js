const db = require("../database/db");
const jwt = require("jsonwebtoken");
const secret = "b1";

const verifyLogin = async (req) => {
  try{
    var email = req.email;
    var senha = req.senha;
    var retorno = await db.query(
      `select l.*, c.descricao
      from dbo.login l
       inner join dbo.cargo c 
       on l.id_cargo = c.id 
       where email = '${email}'`
    );
    var data = JSON.parse(JSON.stringify(retorno[0]));
    
    var status = {};
    if (data[0].descricao == "Suporte") {
      console.log("SUPORTE");
      status = await db.query(
        `SELECT [status]
        FROM [dbo].[suporte]
        where id_login = '${data[0].id}'`
      );
      

    }
    if (data[0].descricao == "Varejo") {
  
      status = await db.query(
        `SELECT [status]
        FROM [dbo].[varejo]
        where id_login = '${data[0].id}'`
      );
      console.log("VAREJO");
    }
    if (data[0].descricao == "Marca") {
      console.log("MARCA");

      status = await db.query(
        `SELECT [status]
        FROM [dbo].[marca]
        where id_login = '${data[0].id}'`
      );
    }

    var dataStatus = JSON.parse(JSON.stringify(status[0]));
    console.log(dataStatus[0].status);
    console.log("aqui porra ====> ",data[0].id,data[0].id_cargo,data[0].email);
 
    var token = jwt.sign({
      usuarioId: data[0].id,
      cargoId: data[0].id_cargo,
      email: data[0].email,
    },
    secret,
    { expiresIn: 1000 }
    );

   if (!dataStatus[0].status){
    console.log("aquiiiii");
      return {error: 'Usuário sem acesso!'};
     
    }

    if (!data[0] || data[0].senha != senha){
      return {error: 'Usuário inexistente ou senha inválida'};
     
    }

      return token;
      
    } catch(error){
      console.log("PEDRAO MASSA")
      return {error: 'Usuário inexistente ou senha inválida'};
    }
};

module.exports = {
  verifyLogin,
};
