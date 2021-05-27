const {userService} = require("../services");
const {createToken} = require("../utils/token");

async function login(req,res) {
    const {email,password} = req.body;
    const user = await userService.login(email,password);
    if (user) {
        let id = user.dataValues.id;
        const token = createToken({email,password,id});
        
        delete user.dataValues.password;
        delete user.dataValues.updatedAt;
        delete user.dataValues.createdAt;

        res.json({user,token,status:'successful'})
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
