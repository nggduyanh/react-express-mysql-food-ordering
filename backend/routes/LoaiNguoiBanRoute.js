const express = require ("express")
const router = express.Router ()
const LoaiNguoiBanController = require ("../controllers/LoaiNguoiBanController")

router.delete ("/delete",LoaiNguoiBanController.delete)
router.put ("/update",LoaiNguoiBanController.update)
router.post("/add",LoaiNguoiBanController.add)
router.get ("/", LoaiNguoiBanController.index)
router.get ("/:id",LoaiNguoiBanController.getById)

module.exports = router