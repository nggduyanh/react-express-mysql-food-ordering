const express = require ("express")
const router = express.Router ()
const LoaiNguoiBanController = require ("../controllers/LoaiNguoiBanController")

router.delete ("/delete",LoaiNguoiBanController.delete)
router.patch ("/update",LoaiNguoiBanController.update)
router.post("/add",LoaiNguoiBanController.add)
router.get ("/", LoaiNguoiBanController.index)
router.get ("/:id",LoaiNguoiBanController.getById)
router.get ("/nguoiban/:idNguoiBan",LoaiNguoiBanController.getLoaiNguoiBanByNguoiBan)
module.exports = router