//Conexão com o banco de dados
var db = [
    {id: 'wtert', nome: 'test'}
]

const insert = (userDTO) => {
    try {
        if (userDTO.name)
            db.push(userDTO)
            return { data: 'Sucesso ao inserir novo usuario'}
    } catch (error) {
        return { error: error.message }
    }
}

const selectByID = (id) => {
    try {
        db.forEach(data => {
            if (data.id == id)
                return data
        })
    } catch (error) {
        return { error: error.message }
    }
}

const selectAll = () => {
    try {
        return db;
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    insert,
    selectByID,
    selectAll,
}