const { product } = require("../models");
const {send} = require("../utils/mail")

function add(productData) {
  return product.create(productData);
}

function deleteById(companyId, id) {
  return product.destroy({ where: (productId = id), companyId: companyId });
}

function getById(userId, productID) {
  console.log(productID)
  return product.findOne({ where: { userId, productID } });
}

function getAll(userId) {
  console.log(userId)
  return product.findAll({ where: { userId } });
}

function updateById(userId, productID, data) {
  return product.update(data, { where: { userId, productID } }); // ?
}

module.exports = {add,deleteById,getById,getAll,updateById}
