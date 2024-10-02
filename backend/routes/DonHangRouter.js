const express = require ("express")
const router = express.Router ()
const DonHangController = require ("../controllers/DonHangController")

router.delete ("/delete",DonHangController.delete)
router.put ("/update",DonHangController.update)
router.post("/add",DonHangController.add)
router.get ("/", DonHangController.index)
router.get ("/:id",DonHangController.getById)

module.exports = router