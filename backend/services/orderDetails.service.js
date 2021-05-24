const {orderDetails } = require("../models");
const mail = require("../utils/mail");

function add(orderDetailsData) {
     return orderDetails.create(orderDetailsData);
}

async function get(orders) {
     for (let index = 0; index < orders.length; index++) {
          const orderId = orders[index].id;
          const details = await orderDetails.findAll({where: {orderId}})
          orders[index].dataValues.orderDetails = details;
     }
     return orders;
}

function deleteOrderDetails(orderId) {
    return orderDetails.destroy({where: {orderId}})
 }

module.exports = {add,deleteOrderDetails,get}