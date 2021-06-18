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
    const {productId} = req.params;
    const userId = req.userId;
    console.log("*************",productId,userId);
    let status = await productService.deleteById(userId,productId);
    if (status) {
       setTimeout( ()=>{res.json({status:"Ürün silindi."})},2000)
    }else {
        res.json({status:"Ürün bulunamadi..."})
    }
}

async function updateById(req,res) {
    const userId = req.userId;
    const {product} = req.body;
    let status = await productService.updateById(userId,product);
    if (status) {
       setTimeout(()=> {res.json({status:"Ürün Güncellendi."})},1000)
    }else {
        res.json({status:"Hata"})
    }
}

module.exports = {add,getAll,getById,deleteById,updateById}