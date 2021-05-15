const { Sequelize } = require("sequelize")

require("dotenv").config();
const { DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PASS,
    DB_TYPE } = process.env;


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: DB_TYPE
});

module.exports = sequelize;