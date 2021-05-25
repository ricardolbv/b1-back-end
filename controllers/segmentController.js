const sequelize = require("sequelize");
const db = require("../database/db");

const selectSegment = async () => {
  try {
    const segment = await db.query(`SELECT id, segmento FROM dbo.segmento`);

    return segment;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  selectSegment,
};
