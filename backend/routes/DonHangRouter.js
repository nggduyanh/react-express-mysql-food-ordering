const express = require ("express")
const router = express.Router ()
const DonHangController = require ("../controllers/DonHangController")
const authorize = require("../middlewares/Authorization")

router.delete ("/delete",DonHangController.delete)
router.patch ("/update",DonHangController.update)
router.post("/add",DonHangController.add)
router.get ("/", DonHangController.index)
router.get ("/:id",DonHangController.getById)
router.post ("/chitietdonhang/add",DonHangController.addChiTietDonHang)
router.patch ("/chitietdonhang/update",DonHangController.updateChiTietDonHang)
router.delete ("/chitietdonhang/delete",DonHangController.deleteChiTietDonHang)
router.get ("/nguoiban/:idNguoiBan",DonHangController.getByIdNguoiBan)

module.exports = router