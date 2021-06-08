const router = require("express").Router();
const {userController} = require("../controllers");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/suppliers", userController.getSuppliers)
module.exports = router;