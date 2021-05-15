const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class OrderDetails extends Model {};

OrderDetails.init({
    orderID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pricenet : {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    pricegross: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    tax : {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "OrderDetails",
    charset: "utf8"
});

//OrderDetails.sync({force: true});

module.exports = OrderDetails;