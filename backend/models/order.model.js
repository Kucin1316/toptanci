const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class Order extends Model {};

Order.init({
    
    ordererId : {
        type : DataTypes.INTEGER,
        allowNull: true
    },
    supplierId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status:{
        type:DataTypes.TEXT,
        allowNull:true,
        defaultValue:"pending"
    },
    totalPriceNet: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    totalPriceGross: {
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