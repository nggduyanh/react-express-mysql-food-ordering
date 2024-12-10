const express = require ("express")
const router = express.Router ()
const KhuyenMaiController = require ("../controllers/KhuyenMaiController")
const authorize = require("../middlewares/Authorization")

router.delete ("/delete",authorize ("Seller"),KhuyenMaiController.delete)
router.patch ("/update",authorize ("Seller"),KhuyenMaiController.update)
router.post("/add",authorize ("Seller"),KhuyenMaiController.add)
router.get ("/", KhuyenMaiController.index)
router.get ("/:id",KhuyenMaiController.getById)
router.get ("/nguoimua/:idNguoiMua",authorize ("Buyer"),KhuyenMaiController.getKhuyenMaiByNguoiMua)
module.exports = router