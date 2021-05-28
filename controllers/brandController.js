const sequelize = require("sequelize");
const db = require("../database/db");

const selectAll = async () => {
  try {
    const retail = await db.query(
      `SELECT
        m.[id]
        ,m.[nome]
        ,m.[cnpj]
        ,m.[telefone]
        ,m.[status]
        ,l.email
        ,l.senha
        ,c.descricao as cargo
        ,s.segmento
        ,v.nome_fantasia as [varejo_responsavel]
        ,m.[id_varejo]
        ,m.[created_at]
        ,m.[updated_at]
      FROM [dbo].[marca] m

      inner join dbo.[login] l
      on l.id = m.id_login

      inner join dbo.cargo c
      on c.id = m.id_cargo

      inner join dbo.segmento s
      on s.id = m.id_segmento

      inner join dbo.varejo v
      on v.id = m.id_varejo`
    );

    return retail;
  } catch (error) {
    return { error: error.message };
  }
};

const createBrand = async (brandDTO) => {
  try {
    const sqlValidateEmail = await db.query(
      `SELECT COUNT(email) as qtdUsuario FROM dbo.login WHERE email = '${brandDTO.email}'`
    );

    const validateEmail = JSON.parse(JSON.stringify(sqlValidateEmail[0]))[0]
      .qtdUsuario;

    if (validateEmail == 0) {
      const insertLogin = `INSERT INTO dbo.login (email, senha, url_foto_perfil, id_cargo, created_at, updated_at) VALUES('${brandDTO.email}','${brandDTO.senha}',NULL,'${brandDTO.id_cargo}',GETDATE(), GETDATE())`;

      const user = await db.query(insertLogin, {
        type: db.QueryTypes.INSERT,
      });

      const sqlLogin = await db.query(
        `SELECT id FROM dbo.login where [email] = '${brandDTO.email}' AND  [senha] = '${brandDTO.senha}'`
      );

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
};

const updateStatusBrand = async (brandDTO) => {
  try {
    const sql = await db.query(
      `SELECT id FROM dbo.login WHERE email = '${brandDTO.email}'`
    );

    const idlogin = JSON.parse(JSON.stringify(sql[0]))[0].id;

    const sqlUpdate = `UPDATE dbo.marca
      SET status = ${brandDTO.status}
      WHERE id_login = '${idlogin}'`;

    const executeUpdate = await db.query(sqlUpdate, {
      type: db.QueryTypes.UPDATE,
    });

    return { data: "Status alterado com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  selectAll,
  createBrand,
  updateStatusBrand,
};
