const sequelize = require("sequelize");
const db = require("../database/db");

const selectAll = async (brandDTO) => {
  try {


     const userSql = await db.query(
      `SELECT c.descricao
      FROM dbo.login l
      inner join dbo.cargo c
      on l.id_cargo = c.id 
      WHERE l.id = ${brandDTO}`
    );

    const cargo = JSON.parse(JSON.stringify(userSql[0]));

    var brand = {};

    if (cargo[0].descricao == "Suporte") {
      brand = await db.query(
        `SELECT
          m.[id]
          ,m.[nome]
          ,m.[cnpj]
          ,m.[telefone]
          ,m.[status]
          ,m.id_login
          ,l.email
          ,l.senha
          ,m.id_cargo
          ,c.descricao as cargo
          ,m.id_segmento
          ,s.segmento
          ,m.[id_varejo]
          ,v.nome_fantasia as [varejo_responsavel]
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
    } 
    else {
      if (cargo[0].descricao == "Varejo") {
        brand = await db.query(
          `SELECT
            m.[id]
            ,m.[nome]
            ,m.[cnpj]
            ,m.[telefone]
            ,m.[status]
            ,m.id_login
            ,l.email
            ,l.senha
            ,m.id_cargo
            ,c.descricao as cargo
            ,m.id_segmento
            ,s.segmento
            ,m.[id_varejo]
            ,v.nome_fantasia as [varejo_responsavel]
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
          on v.id = m.id_varejo

          where v.id_login =  ${brandDTO}`
        );
      } else {
        if (cargo[0].descricao == "Marca") {
          brand = await db.query(
            `SELECT
              m.[id]
              ,m.[nome]
              ,m.[cnpj]
              ,m.[telefone]
              ,m.[status]
              ,m.id_login
              ,l.email
              ,l.senha
              ,m.id_cargo
              ,c.descricao as cargo
              ,m.id_segmento
              ,s.segmento
              ,m.[id_varejo]
              ,v.nome_fantasia as [varejo_responsavel]
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
            on v.id = m.id_varejo
  
            where m.id_login =  ${brandDTO}`
          );
        }
      }
    }

    return  brand;
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

const deleteBrand = async (brandDTO) => {
  try {
    const sqlLogin = await db.query(
      `SELECT id FROM  dbo.login WHERE  email = '${brandDTO.email}'`
    );

    const idLogin = JSON.parse(JSON.stringify(sqlLogin[0]))[0].id;

    const deleteBrand = `DELETE FROM dbo.marca  WHERE id_login = '${idLogin}'`;

    await db.query(deleteBrand, {
      type: db.QueryTypes.DELETE,
    });

    const deleteLogin = `DELETE FROM dbo.login  WHERE id = '${idLogin}'`;

    await db.query(deleteLogin, {
      type: db.QueryTypes.DELETE,
    });

    return { data: "Marca excluída com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

const updateBrand = async (brandDTO) => {
  try {
    const sql = await db.query(
      `SELECT m.[id]
      FROM [dbo].[marca] m
      inner join [dbo].[login] l
      on l.id = m.id_login
      where l.email = '${brandDTO.email}'`
    );

    const idBrand = JSON.parse(JSON.stringify(sql[0]))[0].id;

    const sqlBrandUpdate = `UPDATE dbo.marca
      SET nome = '${brandDTO.update_nome}',
          cnpj = '${brandDTO.update_cnpj}',
          telefone = '${brandDTO.update_telefone}',
          id_segmento = '${brandDTO.update_id_segmento}',
          id_varejo = '${brandDTO.update_id_varejo}',
          updated_at = GETDATE()
      WHERE id = '${idBrand}'`;

    await db.query(sqlBrandUpdate, {
      type: db.QueryTypes.UPDATE,
    });

    return { data: "Marca alterada com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  selectAll,
  createBrand,
  updateStatusBrand,
  deleteBrand,
  updateBrand,
};
