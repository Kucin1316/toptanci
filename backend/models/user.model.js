const {Model, DataTypes} = require('sequelize');
const sequelize  = require("../config/database")

class User extends Model {} 
User.init({
   email: { 
       type : DataTypes.TEXT,
       allowNull : false
   } ,
   password: {
    type : DataTypes.TEXT,
    allowNull : false
   } , 
   companyName: {
       type : DataTypes.TEXT,
       allowNull : false
   } , 
   adress: {
       type : DataTypes.TEXT,
       allowNull : false
   } , 
   tel: {
       type : DataTypes.TEXT,
       allowNull : false
   } 
} ,{sequelize, modelName: "User", charset: "utf8"})

 //User.sync({force:true});

module.exports = User;
