const sequelize = require('sequelize');
const db = require('../database/db');

const selectAll = async () => {
    try {
        const retail = await db.query("SELECT * FROM varejo");
        return retail;
    } catch (error) {
        return { error: error.message }
    }
}

const insert = async (retailDTO) => {
    try {
        const sql = `INSERT INTO varejo
        (inscricao, cnpj, razao_social, nome_fantasia, telefone, status, id_cargo, id_login, id_segmento, created_at, updated_at)
        VALUES('${retailDTO.inscricao}','${retailDTO.cnpj}','${retailDTO.razao_social}','${retailDTO.nome_fantasia}','${retailDTO.telefone}',
                ${retailDTO.status},'${retailDTO.id_cargo}', '${retailDTO.id_login}', '${retailDTO.id_segmento}',
                '${retailDTO.created_at}', '${retailDTO.updated_at}')`;

        const retail = await db.query(sql, {
            type: db.QueryTypes.INSERT
        }); 
        console.log(retail) 

        return { data: 'Sucesso ao inserir novo varejo'}
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    selectAll,
    insert,
}
