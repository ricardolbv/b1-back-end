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

const createBrand = async (bradDTO) => {
  try {
    const sqlValidateEmail = await db.query(
      `SELECT COUNT(email) as qtdUsuario FROM dbo.login WHERE email = '${bradDTO.email}'`
    );

    const validateEmail = JSON.parse(JSON.stringify(sqlValidateEmail[0]))[0]
      .qtdUsuario;

    if (validateEmail == 0) {
      const insertLogin = `INSERT INTO dbo.login (email, senha, url_foto_perfil, id_cargo, created_at, updated_at) VALUES('${bradDTO.email}','${bradDTO.senha}',NULL,'${bradDTO.id_cargo}',GETDATE(), GETDATE())`;

      const user = await db.query(insertLogin, {
        type: db.QueryTypes.INSERT,
      });

      const sqlLogin = await db.query(
        `SELECT id FROM dbo.login where [email] = '${bradDTO.email}' AND  [senha] = '${bradDTO.senha}'`
      );

      const id_login = JSON.parse(JSON.stringify(sqlLogin[0]))[0].id;

      /*const sqlBrand = `INSERT INTO dbo.marca
      (nome,cnpj,telefone,status,id_cargo,id_login,id_segmento,id_varejo,created_at,updated_at)
      VALUES('${bradDTO.nome}','${bradDTO.cnpj}','${bradDTO.telefone}',1,${bradDTO.id_cargo},${id_login},${bradDTO.id_segmento},${bradDTO.id_varejo},GETDATE(), GETDATE())`;

      const brand = await db.query(sqlBrand, {
        type: db.QueryTypes.INSERT,
      });*/
    } else {
      console.log("Existe");
      return { errorEmail: "Email informado já está sendo utilizado" };
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
