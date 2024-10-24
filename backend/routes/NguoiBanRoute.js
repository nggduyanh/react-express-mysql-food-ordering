const express = require ("express")
const router = express.Router ()
const nguoiBanController = require ("../controllers/NguoiBanController")
const addImageFile = require ("../middlewares/FormFile")
const nguoiBan = require ("../utils/constants/NguoiBanConstant")

router.delete ("/delete",nguoiBanController.delete)
router.patch ("/update",addImageFile (nguoiBan.anh,nguoiBan.cccd,nguoiBan.giayPhep),nguoiBanController.update)
router.post("/add",addImageFile (nguoiBan.anh,nguoiBan.cccd,nguoiBan.giayPhep),nguoiBanController.add)
router.get ("/", nguoiBanController.index)
router.get ("/:id",nguoiBanController.getById)
router.post ("/loainguoiban/add",nguoiBanController.addLoaiNguoiBan)
router.delete ("/loainguoiban/delete", nguoiBanController.deleteLoaiNguoiBan)
router.patch ("/nhanxet/update",nguoiBanController.replyNhanXet)
router.get ("/nguoibanyeuthich/:idNguoiMua",nguoiBanController.getByNguoiBanYeuThich)
router.get ("/nhanxet/:idNguoiBan",nguoiBanController.getNhanXetByNguoiBan)

module.exports = router