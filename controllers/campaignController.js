const sequelize = require("sequelize");
const db = require("../database/db");

const selectAll = async (campaignDTO) => {
    try {
      const userSql = await db.query(
        `SELECT c.descricao
        FROM dbo.login l
        inner join dbo.cargo c
        on l.id_cargo = c.id 
        WHERE l.id = ${campaignDTO.usuarioId}`
      );

      const cargo = JSON.parse(JSON.stringify(userSql[0]));

      var retail = {};
     
    if (cargo[0].descricao == "Suporte") {
        retail = await db.query(
          `SELECT 
              C.[id]
              ,C.[campanha]
              ,C.[descricao]
              ,C.[data_de_inicio]
              ,C.[data_de_fim]
              ,C.[id_marca]
              ,M.[nome] AS nome_marca
              ,M.[id_varejo]
              ,V.nome_fantasia as nome_varejo
              ,C.[created_at]
              ,C.[updated_at]
          FROM [dbo].[campanha] C
          INNER JOIN [dbo].[marca] M
          ON C.id_marca = M.id
      
          INNER JOIN [dbo].[varejo] V
          ON V.id = M.id_varejo`
        );
    } else {
      if (cargo[0].descricao == "Varejo") {
        retail = await db.query(
          `SELECT 
              C.[id]
              ,C.[campanha]
              ,C.[descricao]
              ,C.[data_de_inicio]
              ,C.[data_de_fim]
              ,C.[id_marca]
              ,M.[nome] AS nome_marca
              ,M.[id_varejo]
              ,V.nome_fantasia as nome_varejo
              ,C.[created_at]
              ,C.[updated_at]
          FROM [dbo].[campanha] C
          INNER JOIN [dbo].[marca] M
          ON C.id_marca = M.id
      
          INNER JOIN [dbo].[varejo] V
          ON V.id = M.id_varejo
          
          WHERE V.id_login = ${campaignDTO.usuarioId}`

          

        );
      } else {
        if (cargo[0].descricao == "Marca") {
            retail = await db.query(
              `SELECT 
                  C.[id]
                  ,C.[campanha]
                  ,C.[descricao]
                  ,C.[data_de_inicio]
                  ,C.[data_de_fim]
                  ,C.[id_marca]
                  ,M.[nome] AS nome_marca
                  ,M.[id_varejo]
                  ,V.nome_fantasia as nome_varejo
                  ,C.[created_at]
                  ,C.[updated_at]
              FROM [dbo].[campanha] C
              INNER JOIN [dbo].[marca] M
              ON C.id_marca = M.id
          
              INNER JOIN [dbo].[varejo] V
              ON V.id = M.id_varejo
              
              WHERE M.[id_login] = ${campaignDTO.usuarioId}`
            );

        }
      }
    }

      return retail;
    } catch (error) {
      return { error: error.message };
    }
  };


  /*const createCampaign = async (campaignDTO) => {
    try {
  


  
        const idLogin = JSON.parse(JSON.stringify(sqlLogin[0]))[0].id;
  
        const sqlBrand = `INSERT INTO dbo.marca
        (nome,cnpj,telefone,status,id_cargo,id_login,id_segmento,id_varejo,created_at,updated_at)
        VALUES('${brandDTO.nome}','${brandDTO.cnpj}','${brandDTO.telefone}',1,${brandDTO.id_cargo},${idLogin},${brandDTO.id_segmento},${brandDTO.id_varejo},GETDATE(), GETDATE())`;
  
        const brand = await db.query(sqlBrand, {
          type: db.QueryTypes.INSERT,
        });
      } else {
        console.log("Existe");
        return { errorEmail: "Email informado já está sendo utilizado" };
      }
  
      return { data: "Marca cadastrada com sucesso" };
    } catch (error) {
      return { error: error.message };
    }
  };*/



  module.exports = {
    selectAll,
    
  };