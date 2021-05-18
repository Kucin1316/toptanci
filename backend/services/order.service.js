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

function getIncomingOrder(id) {
  //supplierId
  return order.findAll({where:{
    supplierId:id
  }})
}
function getPlacedOrder(id) {
  //ordererId 
  return order.findAll({where:{
    ordererId:id
  }})
}



module.exports = {deleteOrder,updateStatus,add,getIncomingOrder,getPlacedOrder};