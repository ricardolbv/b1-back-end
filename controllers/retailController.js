const sequelize = require("sequelize");
const db = require("../database/db");

const selectAll = async () => {
  try {
    const retail = await db.query(
      `SELECT 
      v.id
      ,v.inscricao
      ,v.cnpj
      ,v.razao_social
      ,v.nome_fantasia
      ,v.telefone
      ,v.status
      ,l.email
      ,l.senha
      ,c.descricao as cargo
      ,s.segmento
      ,v.created_at
      ,v.updated_at
      FROM dbo.varejo v
        
      inner join dbo.login l
      on l.id = v.id_login
      
      inner join dbo.cargo c
      on c.id = v.id_cargo
      
      inner join dbo.segmento s
      on s.id = v.id_segmento`
    );

    return retail;
  } catch (error) {
    return { error: error.message };
  }
};

const createRetail = async (retailDTO) => {
  try {
    const sqlValidateEmail = await db.query(
      `SELECT COUNT(email) as qtdUsuario FROM dbo.login WHERE email = '${retailDTO.email}'`
    );
    const validateEmail = JSON.parse(JSON.stringify(sqlValidateEmail[0]))[0]
      .qtdUsuario;

    if (validateEmail == 0) {
      const insertLogin = `INSERT INTO dbo.login
            (email, senha, url_foto_perfil, id_cargo, created_at, updated_at)
            VALUES('${retailDTO.email}','${retailDTO.senha}',NULL,'${retailDTO.id_cargo}',GETDATE(), GETDATE())`;

      const user = await db.query(insertLogin, {
        type: db.QueryTypes.INSERT,
      });

      const sqlLogin = await db.query(
        `SELECT id FROM dbo.login where [email] = '${retailDTO.email}' AND  [senha] = '${retailDTO.senha}'`
      );

      const login = JSON.parse(JSON.stringify(sqlLogin[0]));

      const sqlRetail = `INSERT INTO varejo
            (inscricao, cnpj, razao_social, nome_fantasia, telefone, status, id_cargo, id_login, id_segmento, created_at, updated_at)
            VALUES('${retailDTO.inscricao}','${retailDTO.cnpj}','${retailDTO.razao_social}','${retailDTO.nome_fantasia}','${retailDTO.telefone}','${retailDTO.status}',
            '${retailDTO.id_cargo}', ${login[0].id}, '${retailDTO.id_segmento}',GETDATE(), GETDATE())`;

      const retail = await db.query(sqlRetail, {
        type: db.QueryTypes.INSERT,
      });
    } else {
      return { error: "Email informado já está sendo utilizado" };
    }

    return { data: "Varejo cadastrado com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

const updateStatusRetail = async (retailDTO) => {
  try {
    const sql = await db.query(
      `SELECT id FROM dbo.login WHERE email = '${retailDTO.email}'`
    );

    const idlogin = JSON.parse(JSON.stringify(sql[0]))[0].id;

    const sqlUpdate = `UPDATE dbo.varejo
      SET status = ${retailDTO.status}
      WHERE id_login = '${idlogin}'`;

    const executeUpdate = await db.query(sqlUpdate, {
      type: db.QueryTypes.UPDATE,
    });

    return { data: "Status alterado com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteRetail = async (retailDTO) => {
  try {
    const sqlLogin = await db.query(
      `SELECT id FROM  dbo.login WHERE  email = '${retailDTO.email}'`
    );

    const idLogin = JSON.parse(JSON.stringify(sqlLogin[0]))[0].id;

    const deleteRetail = `DELETE FROM dbo.varejo  WHERE id_login = '${idLogin}'`;

    const executeDeleteRetail = await db.query(deleteRetail, {
      type: db.QueryTypes.DELETE,
    });

    const deleteLogin = `DELETE FROM dbo.login  WHERE id = '${idLogin}'`;

    const executeDeleteLogin = await db.query(deleteLogin, {
      type: db.QueryTypes.DELETE,
    });

    return { data: "Varejo excluído com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

const updateRetail = async (retailDTO) => {
  try {
    const sql = await db.query(
      `SELECT v.id FROM dbo.varejo v
       inner join dbo.login l
       on l.id = v.id_login
       WHERE email = '${retailDTO.email}'`
    );

    const idRetail = JSON.parse(JSON.stringify(sql[0]))[0].id;

    const sqlRetailUpdate = `UPDATE dbo.varejo
      SET inscricao = '${retailDTO.update_inscricao}',
          cnpj = '${retailDTO.update_cnpj}',
          razao_social = '${retailDTO.update_razao_social}',
          nome_fantasia = '${retailDTO.update_nome_fantasia}',
          telefone = '${retailDTO.update_telefone}',
          id_segmento = '${retailDTO.update_id_segmento}',
          updated_at = GETDATE()
      WHERE id = '${idRetail}'`;

    const sqlLoginUpdate = `UPDATE dbo.login
      SET senha = '${retailDTO.update_senha}',
          updated_at = GETDATE()
      WHERE email = '${retailDTO.email}'`;

    await db.query(sqlRetailUpdate, {
      type: db.QueryTypes.UPDATE,
    });

    await db.query(sqlLoginUpdate, {
      type: db.QueryTypes.UPDATE,
    });

    return { data: "Varejo alterado com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};
module.exports = {
  selectAll,
  createRetail,
  updateStatusRetail,
  deleteRetail,
  updateRetail,
};
