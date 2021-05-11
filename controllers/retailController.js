const { QueryTypes } = require('sequelize');
const db = require('../database/db');

const selectAll = async () => {
    try {
        const retail = await db.query("SELECT * FROM varejo");
        return retail;
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    selectAll,
}
