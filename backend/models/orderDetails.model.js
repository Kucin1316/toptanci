const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class OrderDetails extends Model {};

OrderDetails.init({
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceNet : {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    priceGross: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    tax: {
        type: DataTypes.DECIMAL,
        allowNull:false
    }
   
}, {
    sequelize,
    modelName: "OrderDetails",
    charset: "utf8"
});

 //OrderDetails.sync({force: true});

module.exports = OrderDetails;