const express = require ("express")
const router = express.Router ()
const DonHangController = require ("../controllers/DonHangController")

router.delete ("/delete",DonHangController.delete)
router.put ("/update",DonHangController.update)
router.post("/add",DonHangController.add)
router.get ("/", DonHangController.index)
router.get ("/:id",DonHangController.getById)
router.post ("/chitietdonhang/add",DonHangController.addChiTietDonHang)
router.put ("/chitietdonhang/update",DonHangController.updateChiTietDonHang)
router.delete ("/chitietdonhang/delete",DonHangController.deleteChiTietDonHang)

module.exports = router