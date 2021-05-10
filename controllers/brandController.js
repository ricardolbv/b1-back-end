db = [
    {id: 'rghehg', nome: 'Adidas'},
    {id: 'rg55', nome: 'Nike'},
    {id: 'rgh77', nome: 'Americanas'},
]

const selectAll = () => {
    try {
        return db;
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    selectAll,
}