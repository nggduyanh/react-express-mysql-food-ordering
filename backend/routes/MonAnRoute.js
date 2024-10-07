const express = require ("express")
const router = express.Router ()
const MonAnController = require ("../controllers/MonAnController")

router.delete ("/delete",MonAnController.delete)
router.patch ("/update",MonAnController.update)
router.post("/add",MonAnController.add)
router.get ("/", MonAnController.index)
router.get ("/:id",MonAnController.getById)
router.get ("/nguoiban/:idNguoiBan", MonAnController.getByNguoiBan)
router.get ("/donhang/:idDonHang",MonAnController.getByHoaDon)

module.exports = router