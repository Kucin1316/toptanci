const router = require("express").Router();
const {productController} = require("../controllers");
const {auth} = require("../middlewares");

router.use(auth);


router.get("/",productController.getAll);
router.post("/",productController.add);
router.get("/:id",productController.getById);

module.exports = router;
