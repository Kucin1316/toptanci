const {userService} = require("../services");
const {createToken} = require("../utils/token");

async function login(req,res) {
    const {email,password} = req.body;
    const status = await userService.login(email,password);
    if (status) {
        let id = status.dataValues.id;
        const token = createToken({email,password,id});
        res.json({status,token})
    } else    {
        res.json({error: "Kullanici adi yada sifre hatali"})
    }
}

async function register(req,res) {
    const {userData} = req.body;
    console.log(userData);
    const status = await userService.register(userData);
    res.json({status});
}

async function updateById(req,res) {
    const {userData} = req.body;
    const status = await userService.updateById(userData);
    return status
}

module.exports = {login,register};
