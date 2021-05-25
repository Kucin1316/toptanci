const jwt = require("jsonwebtoken");

function createToken(data) {
    const token= jwt.sign(data,process.env.JWT_SECRETKEY, {expiresIn: "5H"})
    return token;
}

function checkToken(token) {
    var decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
    return decoded;
}

module.exports = {createToken, checkToken} ; 
