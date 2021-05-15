const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class Order extends Model {};

Order.init({
    orderDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ordererID : {
        type : DataTypes.INTEGER,
        allowNull: true
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    totalPriceNet: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    totalPricegross: {
        type: DataTypes.DECIMAL,
        allowNull: true
    }
},{
    sequelize,
    modelName: "Order",
    charset: "utf8"
});



//Order.sync({force:true});

module.exports = Order;