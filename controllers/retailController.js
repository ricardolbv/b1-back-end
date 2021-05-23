const sequelize = require("sequelize");
const db = require("../database/db");

const selectAll = async () => {
  try {
    const retail = await db.query("SELECT * FROM varejo");
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
            VALUES('${retailDTO.inscricao}','${retailDTO.cnpj}','${retailDTO.razao_social}','${retailDTO.nome_fantasia}','${retailDTO.telefone}',1,
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

module.exports = {
  selectAll,
  createRetail,
  updateStatusRetail,
  deleteRetail,
};
