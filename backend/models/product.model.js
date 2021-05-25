const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
class Product extends Model {} ;

Product.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    barcode:
    {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
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
    tax : {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    unit: { // Einheit Birim Örnegin. Adet, Koli, Kasa
        type:DataTypes.TEXT,
        allowNull: false
    },
    amount: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { 
    sequelize,
    modelName: "Product",
    charset : "utf8"
})
 
//Product.sync({force: true});  // Komutu ile tablodaki degisiklikleri veritabaninda güncellemeye zorluyor. 

module.exports = Product;