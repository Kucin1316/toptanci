 
const { orderService, orderDetailsService, userService, productService } = require("../services");
const {sendMail} = require("../utils/mail")

async function deleteById(req, res) {
    try {

        await orderService.deleteOrder(req.params.id);
        await orderDetailsService.deleteOrderDetails(req.params.id);
        res.json({ status: "succesfull" });
    } catch (error) {
        res.json({ status: "failed" ,error});
    }
}

async function updateStatus(req, res) {
  await orderService.updateStatus(req.params.id, req.body.status);
  res.json({ status: "status updated" });
}

async function add(req, res) {
  try {
    const orderId = (await orderService.add(req.body.orderData)).id;
    const orderDetails = req.body.orderData.orderDetails;

    for (let index = 0; index < orderDetails.length; index++) {
      const element = orderDetails[index];
      element.orderId = orderId;
      await orderDetailsService.add(element);
    }
    res.json({ status: "succesfull" });
    let {ordererId,supplierId} = req.body.orderData;
    let orderer = await userService.getById(ordererId);
    let supplier = await userService.getById(supplierId);
    let order = {orderer,supplier, ...req.body.orderData}
   for (let i = 0; i < order.orderDetails.length; i++) {
    let productId = order.orderDetails[i].productId;
    let product = await productService.getById(supplierId,productId)
    order.orderDetails[i] = { product, ...order.orderDetails[i] };
   }
      
    sendMail(orderer.email,"Siparişiniz alındı",{order},"order")
    sendMail(supplier.email,"Yeni Sipariş geldi",{order},"order")
  } catch (error) {
    res.json({ status: "failed" ,error});
  }
}

async function get(req,res){
  let {orderType} = req.params;
  //gelen/alınan siparişler
  if(orderType=="incoming"){
   let incomingOrders =  await orderService.getIncomingOrder(req.userId);
   const result = await orderDetailsService.get(incomingOrders);
   console.log(result);
   res.json({incoming:result})
  }
  //verdiğimiz siparişler
  else if(orderType == "placed"){
    let placedOrders =  await orderService.getPlacedOrder(req.userId);
    const result = await orderDetailsService.get(placedOrders);
    console.log(result);
    res.json({placed:result})
  } else {
    res.json({status:"error"})
  }
}

module.exports = { deleteById, updateStatus ,add,get};
