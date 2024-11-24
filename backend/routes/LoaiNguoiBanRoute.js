const express = require ("express")
const router = express.Router ()
const LoaiNguoiBanController = require ("../controllers/LoaiNguoiBanController")
const authorize = require("../middlewares/Authorization")

router.delete ("/delete",authorize ("Admin"),LoaiNguoiBanController.delete)
router.patch ("/update",authorize ("Admin"),LoaiNguoiBanController.update)
router.post("/add",authorize ("Admin"),LoaiNguoiBanController.add)
router.get ("/",authorize ("Admin"), LoaiNguoiBanController.index)
router.get ("/:id",authorize ("Admin"),LoaiNguoiBanController.getById)
router.get ("/nguoiban/:idNguoiBan",LoaiNguoiBanController.getLoaiNguoiBanByNguoiBan)
module.exports = router