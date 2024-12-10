const express = require ("express")
const router = express.Router ()
const TrangThaiDonHangController = require ("../controllers/TrangThaiDonHangController")

router.delete ("/delete",TrangThaiDonHangController.delete)
router.patch ("/update",TrangThaiDonHangController.update)
router.post("/add",TrangThaiDonHangController.add)
router.get ("/", TrangThaiDonHangController.index)
router.get ("/:id",TrangThaiDonHangController.getById)

module.exports = router