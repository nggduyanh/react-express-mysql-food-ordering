const express = require ("express")
const router = express.Router ()
const nguoiBanController = require ("../controllers/NguoiBanController")

router.delete ("/delete",nguoiBanController.delete)
router.patch ("/update",nguoiBanController.update)
router.post("/add",nguoiBanController.add)
router.get ("/", nguoiBanController.index)
router.get ("/:id",nguoiBanController.getById)
router.post ("/loainguoiban/add",nguoiBanController.addLoaiNguoiBan)
router.delete ("/loainguoiban/delete", nguoiBanController.deleteLoaiNguoiBan)
router.patch ("/nhanxet/update",nguoiBanController.replyNhanXet)
router.get ("/nguoibanyeuthich/:idNguoiMua",nguoiBanController.getByNguoiBanYeuThich)

module.exports = router