const express = require ("express")
const router = express.Router ()
const MonAnController = require ("../controllers/MonAnController")
const monAn = require ("../utils/constants/MonAnConstant")
const addImageFile = require ("../middlewares/FormFile")
const authorize = require("../middlewares/Authorization")

router.delete ("/delete",authorize ("Seller"),MonAnController.delete)
router.patch ("/update",authorize ("Seller"),addImageFile (monAn.anh),MonAnController.update)
router.post("/add",authorize ("Seller"),addImageFile (monAn.anh),MonAnController.add)
router.get ("/", MonAnController.index)
router.get ("/:id",MonAnController.getById)
router.get ("/nguoiban/:idNguoiBan", MonAnController.getByNguoiBan)
router.get ("/donhang/:idDonHang",MonAnController.getByHoaDon)

module.exports = router