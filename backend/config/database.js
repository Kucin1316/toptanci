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

// DB_HOST = 45.84.189.195
// DB_USER = codercor_selamisahin
// DB_PASS = selamisahin
// DB_NAME = codercor_toptanci
// DB_TYPE = mysql

// JWT_SECRETKEY = huseyin

// SERVER_PORT = 85