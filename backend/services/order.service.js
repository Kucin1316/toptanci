const { order } = require("../models");

function deleteOrder(id) {
   return order.destroy({where: {id}})

}

function updateStatus(id,status) {
   return order.update({status},{where: {id}})
}

function add(orderData) {
  console.log("---->",orderData);
  const { ordererId,supplierId,totalPriceNet,totalPriceGross} = orderData;
  return order.create({
    ordererId,supplierId,totalPriceNet,totalPriceGross
  })
}



module.exports = {deleteOrder,updateStatus,add};