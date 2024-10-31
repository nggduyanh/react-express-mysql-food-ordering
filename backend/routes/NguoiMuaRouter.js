const express = require ("express")
const router = express.Router ()
const NguoiMuaController = require ("../controllers/NguoiMuaController")
const authorize = require("../middlewares/Authorization")

router.get ("/nhanxet/:idMonAn",authorize ("Buyer"),NguoiMuaController.getNguoiMuaByNhanXet)
router.post ("/nhanxet/add",authorize ("Buyer"),NguoiMuaController.addNhanXet)
router.patch ("/nhanxet/update",authorize ("Buyer"),NguoiMuaController.updateNhanXet)
router.post ("/khuyenmai/add",authorize ("Buyer"),NguoiMuaController.addKhuyenMai)
router.delete ("/khuyenmai/delete",authorize ("Buyer"),NguoiMuaController.deleteKhuyenMai)
router.post ("/nguoibanyeuthich/add",authorize ("Buyer"), NguoiMuaController.addNguoiBanYeuThich)
router.delete ("/nguoibanyeuthich/delete",authorize ("Buyer"), NguoiMuaController.deleteNguoiBanYeuThich)
module.exports = router