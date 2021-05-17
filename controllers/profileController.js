const db = require("../database/db");

const selectPerfil = async (profileDTO) => {
  try {
    const sql = await db.query(
      `SELECT descricao FROM cargo WHERE id = ${profileDTO.cargoId}`
    );
    const cargo = JSON.parse(JSON.stringify(sql[0]));

    var profile = {};

    if (cargo[0].descricao == "Suporte") {
      profile = await db.query(
        `SELECT 
            l.email
            ,l.senha
            ,l.url_foto_perfil
            ,l.updated_at
            ,s.nome
            ,s.empresa
            ,s.telefone
            ,s.status
        FROM dbo.login l
        INNER JOIN dbo.suporte s
        ON l.id = s.id_login
        WHERE l.id = '${profileDTO.userId}'`
      );
    } else {
      if (cargo[0].descricao == "Varejo") {
        profile = await db.query(
          `SELECT 
            l.email
            ,l.senha
            ,l.url_foto_perfil
            ,l.updated_at
            ,v.inscricao
            ,v.cnpj
            ,v.razao_social
            ,v.nome_fantasia
            ,v.telefone
            ,v.status
           FROM dbo.login l
           INNER JOIN dbo.varejo v
           ON l.id = v.id_login
           WHERE l.id = '${profileDTO.userId}'`
        );
      } else {
        if (cargo[0].descricao == "Marca") {
          profile = await db.query(
            `SELECT 
                  l.email
                  ,l.senha
                  ,l.url_foto_perfil
                  ,l.updated_at
                  ,m.nome
                  ,m.cnpj
                  ,m.telefone
                  ,m.status
                  ,s.segmento
                  ,v.nome_fantasia as varejo_responsavel
               
            FROM dbo.login l
            inner join dbo.marca m
            on l.id = m.id_login
              
            inner join dbo.segmento s
            on s.id = m.id_segmento
              
            inner join dbo.varejo v
            on v.id = m.id_varejo
           
            WHERE l.id = '${profileDTO.userId}'`
          );
        }
      }
    }

    return profile;
  } catch (error) {
    return { error: error.message };
  }
};

const updatePassword = async (userDTO) => {
  try {
    const sqlUpdate = `UPDATE dbo.login
    SET senha = '${userDTO.body.nova_senha}', updated_at =  GETDATE()
    WHERE id = '${userDTO.usuarioId}'`;

    const executeUpdate = await db.query(sqlUpdate, {
      type: db.QueryTypes.UPDATE,
    });

    return { data: "Senha alterada com sucesso" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  selectPerfil,
  updatePassword,
};
