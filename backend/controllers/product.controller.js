const {productService} = require("../services");

async function add(req,res) {
    const {productData} = req.body;
    productData.companyId = req.companyId;
    const status = productService.add(productData);
    res.json({status})
}

async function getAll(req,res) {
    console.log("-..-------------------")
    let products = await productService.getAll(req.companyId);
    res.json({products})
}

async function getById(req,res) {
    console.log(req.companyId)
    console.log(req.params.id)
    let product = await productService.getById(req.companyId,req.params.id);
    console.log(product)
    if (product) {
        res.json({product});
    }else {
        res.json({error:"Ürün bulunamadi"})
    }
}

async function deleteById(req,res) {
    const {productID} = req.params;
    const companyId = req.companyId;
    let status = await productService.deleteById(companyId,productID);
    if (status) {
        res.json({status:"Ürün silindi."})
    }else {
        res.json({status:"Ürün bulunamadi..."})
    }
}

async function updateById(req,res) {
    const companyId = req.companyId;
    const {productData,productID} = req.body;
    let status = await productService.updateById(companyId,productID,productData);
    if (status) {
        res.json({status:"Ürün silindi."})
    }else {
        res.json({status:"Ürün bulunamadi..."})
    }
}

module.exports = {add,getAll,getById,deleteById,updateById}