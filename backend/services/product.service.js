const { product } = require("../models");


function add(productData) {
  return product.create(productData);
}

function deleteById(companyId, id) {
  return product.destroy({ where: (productId = id), companyId: companyId });
}

function getById(companyId, productID) {
  console.log(productID)
  return product.findOne({ where: { companyId, productID } });
}

function getAll(companyId) {
  console.log(companyId)
  return product.findAll({ where: { companyId } });
}

function updateById(companyId, productID, data) {
  return product.update(data, { where: { companyId, productID } }); // ?
}

module.exports = {add,deleteById,getById,getAll,updateById}
