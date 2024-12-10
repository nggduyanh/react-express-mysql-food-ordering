const express = require ("express")
const router = express.Router ()
const VaiTroController = require ("../controllers/VaiTroController")

router.delete ("/delete",VaiTroController.delete)
router.patch ("/update",VaiTroController.update)
router.post("/add",VaiTroController.add)
router.get ("/", VaiTroController.index)
router.get ("/:id",VaiTroController.getById)
router.get ("/nguoidung/:idNguoiDung", VaiTroController.getRoleByNguoiDung)

module.exports = router