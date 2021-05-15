const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class Order extends Model {};

Order.init({
    orderID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ordererID : {
        type : DataTypes.INTEGER,
        allowNull: false
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPriceNet: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    totalPricegross: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
},{
    sequelize,
    modelName: "Order",
    charset: "utf8"
});

//Order.sync({force:true});

module.exports = Order;