const express = require ("express")
const router = express.Router ()
const KhuyenMaiController = require ("../controllers/KhuyenMaiController")

router.delete ("/delete",KhuyenMaiController.delete)
router.put ("/update",KhuyenMaiController.update)
router.post("/add",KhuyenMaiController.add)
router.get ("/", KhuyenMaiController.index)
router.get ("/:id",KhuyenMaiController.getById)

module.exports = router