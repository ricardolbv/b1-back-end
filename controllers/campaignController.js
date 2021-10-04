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


  const createCampaign = async (campaignDTO) => {
    try {
  
      const insertCampaign = 
      `
      INSERT INTO [dbo].[campanha]
            ([campanha]
            ,[descricao]
            ,[data_de_inicio]
            ,[data_de_fim]
            ,[id_marca]
            ,[created_at]
            ,[updated_at])
      VALUES
            ('${campaignDTO.campanha}'
            ,'${campaignDTO.descricao}'
            ,'${campaignDTO.data_de_inicio}'
            ,'${campaignDTO.data_de_fim}'
            ,'${campaignDTO.id_marca}'
            ,GETDATE()
            ,GETDATE())
      `;

            const user = await db.query(insertCampaign , {
              type: db.QueryTypes.INSERT,
            });

      return { data: "Campanha cadastrada com sucesso" };
    } catch (error) {
      return { error: error.message };
    }
  };


  const updateCampaign = async (campaignDTO) => {
    try {
   
      const sqlCampaignUpdate = `update [dbo].[campanha]
      set 
       [campanha] = '${campaignDTO.updateCampanha}',
       [descricao] = '${campaignDTO.updateDescricao}',
       [data_de_inicio] = '${campaignDTO.updateDataInicio}',
       [data_de_fim] = '${campaignDTO.updateDataFim}',
       [id_marca] = '${campaignDTO.updateIdMarca}',
       [updated_at] = getdate()
      where [id] = '${campaignDTO.idCampanha}'`
     
      await db.query(sqlCampaignUpdate, {
        type: db.QueryTypes.UPDATE,
      });
  
       
      return { data: "Campanha alterada com sucesso" };
    } catch (error) {
      return { error: error.message };
    }
  };


  
  const deleteCampaign = async (campaignDTO) => {
    try {
      const deleteCampaign = `DELETE FROM[dbo].[campanha] WHERE id = '${idCampanha}'`;
     
      const executeDeleteCampaign = await db.query(deleteCampaign, {
        type: db.QueryTypes.DELETE,
      });
       
      return { data: "Campanha deletada com sucesso!" };
    } catch (error) {
      return { error: error.message };
    }
  };


  module.exports = {
    selectAll,
    createCampaign,
    updateCampaign,
  };