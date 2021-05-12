const sequelize = require("sequelize");
const db = require("../database/db");

const selectPerfil = async (profileDTO) => {
  try {
    const cargo = await db.query(
      `SELECT descricao FROM cargo WHERE id = '${profileDTO.id_cargo}'`
    );

    if (cargo == "Suporte") {
      const profile = await db.query(
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
        WHERE l.email = '${profileDTO.email}' 
        AND l.senha = '${profileDTO.senha}'`
      );
    } else {
      if (cargo == "Varejo") {
        const profile = await db.query(
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
           WHERE l.email = '${profileDTO.email}' 
           AND l.senha = '${profileDTO.senha}'`
        );
      } else {
        if (cargo == "Marca") {
          const profile = await db.query(
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
           
            WHERE l.email = '${profileDTO.email}' 
            AND l.senha = '${profileDTO.senha}'`
          );
        }
      }
    }

    return profile;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  selectPerfil,
};
