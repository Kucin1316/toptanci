const {orderService} = require("../services");

async function deleteById(req,res) {
    await orderService.deleteOrder(req.params.id)
    res.json({status:"ok"})
}

module.exports = {deleteById}