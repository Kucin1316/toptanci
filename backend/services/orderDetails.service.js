const {orderDetails } = require("../models");

function add(orderDetailsData) {
     return orderDetails.create(orderDetailsData);
}

function deleteOrderDetails(orderId) {
    return orderDetails.destroy({where: {orderId}})
 }

module.exports = {add,deleteOrderDetails}