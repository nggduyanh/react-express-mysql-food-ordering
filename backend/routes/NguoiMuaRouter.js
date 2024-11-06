const express = require ("express")
const router = express.Router ()
const NguoiMuaController = require ("../controllers/NguoiMuaController")
const authorize = require("../middlewares/Authorization")
const imageFile = require ("../middlewares/FormFile")
const anhNhanXet = require ("../utils/constants/AnhNhanXetConstant")

router.get ("/nhanxet/:idMonAn",NguoiMuaController.getNguoiMuaByNhanXet)
router.post ("/nhanxet/add", authorize ("Buyer"),imageFile (anhNhanXet.anh),NguoiMuaController.addNhanXet)
router.patch ("/nhanxet/update",authorize ("Buyer"),imageFile (anhNhanXet.anh),NguoiMuaController.updateNhanXet)
router.post ("/khuyenmai/add",authorize ("Buyer"),NguoiMuaController.addKhuyenMai)
router.delete ("/khuyenmai/delete",authorize ("Buyer"),NguoiMuaController.deleteKhuyenMai)
router.post ("/nguoibanyeuthich/add",authorize ("Buyer"), NguoiMuaController.addNguoiBanYeuThich)
router.delete ("/nguoibanyeuthich/delete",authorize ("Buyer"), NguoiMuaController.deleteNguoiBanYeuThich)
router.get ("/allnhanxet/:idNguoiMua", authorize ("Buyer") ,NguoiMuaController.getNhanXetByNguoiMua)

module.exports = router