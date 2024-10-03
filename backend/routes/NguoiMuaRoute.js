const express = require ("express")
const router = express.Router ()
const nguoiMuaController = require ("../controllers/NguoiMuaController")

router.delete ("/delete",nguoiMuaController.delete)
router.put ("/update",nguoiMuaController.update)
router.post("/add",nguoiMuaController.add)
router.get ("/", nguoiMuaController.index)
router.get ("/:id",nguoiMuaController.getById)
router.get ("/:id/nhanxet",nguoiMuaController.getNhanXetByNguoiMua)
router.post ("/:id/nhanxet/:idMonAn/add",nguoiMuaController.addNhanXet)
router.put ("/:id/nhanxet/:idMonAn/update",nguoiMuaController.updateNhanXet)

module.exports = router