const { product } = require("../models");

function add(productData) {
  return product.create(productData);
}

function deleteById(userId, productId) {
  return product.destroy({ where: {productId, userId} });
}

function getById(userId, id) {
  return product.findOne({ where: { userId, id } });
}

function getAll(userId) {
  console.log(userId)
  return product.findAll({ where: { userId }, });
}

function updateById(userId, productData) {
  return product.update(productData, { where: { userId, productId:productData.productId } }); // ?
}

module.exports = {add,deleteById,getById,getAll,updateById}
