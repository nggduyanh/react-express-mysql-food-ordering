const express = require ("express")
const router = express.Router ()
const loaiMonAnController = require ("../controllers/LoaiMonAnController")
const authorize = require("../middlewares/Authorization")

router.delete ("/delete",authorize ("Seller"),loaiMonAnController.delete)
router.patch ("/update",authorize ("Seller"),loaiMonAnController.update)
router.post("/add",authorize ("Seller"),loaiMonAnController.add)
router.get ("/", loaiMonAnController.index)
router.get ("/:id",loaiMonAnController.getById)

module.exports = router