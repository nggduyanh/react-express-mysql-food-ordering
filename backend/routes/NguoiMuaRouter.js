const express = require ("express")
const router = express.Router ()
const NguoiMuaController = require ("../controllers/NguoiMuaController")

router.get ("/nhanxet/:idMonAn",NguoiMuaController.getNguoiMuaByNhanXet)
router.post ("/nhanxet/add",NguoiMuaController.addNhanXet)
router.patch ("/nhanxet/update",NguoiMuaController.updateNhanXet)
router.post ("/khuyenmai/add",NguoiMuaController.addKhuyenMai)
router.delete ("/khuyenmai/delete",NguoiMuaController.deleteKhuyenMai)
router.post ("/nguoibanyeuthich/add", NguoiMuaController.addNguoiBanYeuThich)
router.delete ("/nguoibanyeuthich/delete", NguoiMuaController.deleteNguoiBanYeuThich )
module.exports = router