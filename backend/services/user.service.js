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

function updateById(userData) {
    const result = user.update({userData},{where: id=userData.id})  // todo ?
    return result;
}

module.exports = {login,register,updateById};
