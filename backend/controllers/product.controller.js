const {productService} = require("../services");

async function add(req,res) {
    const {productData} = req.body;
    productData.userId = req.userId;
    const status = productService.add(productData);
    res.json({status})
}

async function getAll(req,res) {
    console.log("-..-------------------")
    const userId = req.query.userId || req.userId;
    let products = await productService.getAll(userId);
    console.log(products);
    res.json({products})
}

async function getById(req,res) {
    console.log(req.userId)
    console.log(req.params.id)
    let product = await productService.getById(req.userId,req.params.id);
    console.log(product)
    if (product) {
        res.json({product});
    }else {
        res.json({error:"Ürün bulunamadi"})
    }
}

async function deleteById(req,res) {
    const {productID} = req.params;
    const userId = req.userId;
    let status = await productService.deleteById(userId,productID);
    if (status) {
        res.json({status:"Ürün silindi."})
    }else {
        res.json({status:"Ürün bulunamadi..."})
    }
}

async function updateById(req,res) {
    const userId = req.userId;
    const {productData,productID} = req.body;
    let status = await productService.updateById(userId,productID,productData);
    if (status) {
        res.json({status:"Ürün silindi."})
    }else {
        res.json({status:"Ürün bulunamadi..."})
    }
}

module.exports = {add,getAll,getById,deleteById,updateById}