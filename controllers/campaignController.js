const sequelize = require("sequelize");
const db = require("../database/db");

const selectAll = async () => {
    try {
      const retail = await db.query(
        `SELECT 
            C.[id]
            ,C.[campanha]
            ,C.[descricao]
            ,C.[data_de_inicio]
            ,C.[data_de_fim]
            ,C.[id_marca]
            ,M.[nome]
            ,M.[id_varejo]
            ,V.nome_fantasia
            ,C.[created_at]
            ,C.[updated_at]
        FROM [dbo].[campanha] C
        INNER JOIN [dbo].[marca] M
        ON C.id_marca = M.id
    
        INNER JOIN [dbo].[varejo] V
        ON V.id = M.id_varejo`
      );
  
      return retail;
    } catch (error) {
      return { error: error.message };
    }
  };