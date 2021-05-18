const router = require("express").Router();
const { orderController } = require("../controllers");
const {auth} = require("../middlewares");

router.use(auth);

router.delete("/:id",orderController.deleteById);
router.post("/",orderController.add)
router.get("/all/:orderType", orderController.get)
//router.post("/statusUpdate/:id", orderController.update)

module.exports = router;
