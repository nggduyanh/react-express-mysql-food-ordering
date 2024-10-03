const express = require ("express")
const router = express.Router ()
const nguoiMuaController = require ("../controllers/NguoiMuaController")

router.delete ("/delete",nguoiMuaController.delete)
router.put ("/update",nguoiMuaController.update)
router.post("/add",nguoiMuaController.add)
router.get ("/", nguoiMuaController.index)
router.get ("/:id",nguoiMuaController.getById)
router.get ("/nhanxet/:idMonAn",nguoiMuaController.getNguoiMuaByNhanXet)
router.post ("/nhanxet/add",nguoiMuaController.addNhanXet)
router.put ("/nhanxet/update",nguoiMuaController.updateNhanXet)
router.post ("/khuyenmai/add",nguoiMuaController.addKhuyenMai)
router.delete ("/khuyenmai/delet",nguoiMuaController.deleteKhuyenMai)

module.exports = router