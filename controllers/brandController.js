const db = require("../database/db");

const selectAll = async () => {
  try {
    const brand = await db.query("select * from dbo.marca");
    return brand;
  } catch (error) {
    return { error: error.message };
  }
};

const createBrand = async (req) => {
  try {
    const sqlValidateEmail = await db.query(
      `SELECT COUNT(email) as qtdUsuario FROM dbo.login WHERE email = '${req.email}'`
    );
    const validateEmail = JSON.parse(JSON.stringify(sqlValidateEmail[0]))[0]
      .qtdUsuario;

    if (validateEmail == 0) {
      const insertLogin = `INSERT INTO dbo.login
                (email, senha, url_foto_perfil, id_cargo, created_at, updated_at)
                VALUES('${req.email}','${req.senha}',NULL,'${req.id_cargo}',GETDATE(), GETDATE())`;

      await db.query(insertLogin, {
        type: db.QueryTypes.INSERT,
      });

      const sqlLogin = await db.query(
        `SELECT id FROM dbo.login where [email] = '${req.email}' AND  [senha] = '${req.senha}'`
      );

      const login = JSON.parse(JSON.stringify(sqlLogin[0]));

      const sqlRetail = `INSERT INTO marca
                (nome, cnpj, telefone, status, id_cargo, id_login, id_segmento, id_varejo, created_at, updated_at)
                VALUES('${req.nome}','${req.cnpj}','${req.telefone}',1,
                '${req.id_cargo}', ${login[0].id}, '${req.id_segmento}', ${req.id_varejo},GETDATE(), GETDATE())`;

      await db.query(sqlRetail, {
        type: db.QueryTypes.INSERT,
      });
    } else {
      return { error: "Email informado já está sendo utilizado" };
    }

    return { data: "Marca cadastrada com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  selectAll,
  createBrand,
};
