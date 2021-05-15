const { order } = require("../models");


function deleteOrder(id) {
  return order.sequelize.query(`CALL deleteOrder(${id})`)
}

module.exports = {deleteOrder};