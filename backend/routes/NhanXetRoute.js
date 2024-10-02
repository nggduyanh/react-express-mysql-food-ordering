const express = require ("express")
const router = express.Router ()
const nhanXetController = require ("../controllers/NhanXetController")

router.delete ("/delete",nhanXetController.delete)
router.put ("/update",nhanXetController.update)
router.post("/add",nhanXetController.add)
router.get ("/", nhanXetController.index)
router.get ("/monan/:id", nhanXetController.getByMonAn)
router.get ("/nguoimua/:id", nhanXetController.getByNguoiMua)
module.exports = router