const { Model,DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Favori extends Model {};

Favori.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    companyId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Favori",
    charset: "utf8"
})

Favori.sync({force:true});

module.exports = Favori;

