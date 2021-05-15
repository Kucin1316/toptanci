const router = require("express").Router();
const { orderController } = require("../controllers");
const {auth} = require("../middlewares");

//router.use(auth);



router.delete("/:id",orderController.deleteById);



module.exports = router;
