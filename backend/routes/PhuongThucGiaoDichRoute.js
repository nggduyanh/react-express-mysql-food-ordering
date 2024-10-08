const express = require ("express")
const router = express.Router ()
const PhuongThucGiaoDich = require ("../controllers/PhuongThucGiaoDichController")

router.delete ("/delete",PhuongThucGiaoDich.delete)
router.patch ("/update",PhuongThucGiaoDich.update)
router.post("/add",PhuongThucGiaoDich.add)
router.get ("/", PhuongThucGiaoDich.index)
router.get ("/:id",PhuongThucGiaoDich.getById)

module.exports = router