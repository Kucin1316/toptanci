const { user } = require("../models");

function login (email,password) {
    console.log(email)
    const result = user.findOne({where: {email,password}})
    return result;
}

function register(userData) {
    console.log(userData);
    return user.create(userData);
}

function getSuppliers() {
    return user.sequelize.query(`SELECT userId,CompanyName,Adress,COUNT(*) AS urunsayisi FROM Users u
    INNER JOIN Products p ON u.id=p.userId
    GROUP BY userId,CompanyName,Adress`)
}

function getById(id){
    return user.findByPk(id);
}

function updateById(userData) {
    const result = user.update({userData},{where: id=userData.id})  // todo ?
    return result;
}

module.exports = {login,register,updateById,getById,getSuppliers};
