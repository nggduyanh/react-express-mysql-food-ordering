const express = require ("express")
const router = express.Router ()
const KhuyenMaiController = require ("../controllers/KhuyenMaiController")

router.delete ("/delete",KhuyenMaiController.delete)
router.patch ("/update",KhuyenMaiController.update)
router.post("/add",KhuyenMaiController.add)
router.get ("/", KhuyenMaiController.index)
router.get ("/:id",KhuyenMaiController.getById)
router.get ("/nguoimua/:idNguoiMua",KhuyenMaiController.getKhuyenMaiByNguoiMua)
module.exports = router