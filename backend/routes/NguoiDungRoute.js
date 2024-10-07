const express = require ("express")
const router = express.Router ()
const nguoiDungController = require ("../controllers/NguoiDungController")

router.delete ("/delete",nguoiDungController.delete)
router.put ("/update",nguoiDungController.update)
router.post("/add",nguoiDungController.add)
router.get ("/", nguoiDungController.index)
router.get ("/:id",nguoiDungController.getById)

// router.get ("/nhanxet/:idMonAn",nguoiMuaController.getNguoiMuaByNhanXet)
// router.post ("/nhanxet/add",nguoiMuaController.addNhanXet)
// router.put ("/nhanxet/update",nguoiMuaController.updateNhanXet)
// router.post ("/khuyenmai/add",nguoiMuaController.addKhuyenMai)
// router.delete ("/khuyenmai/delet",nguoiMuaController.deleteKhuyenMai)

module.exports = router