const express = require ("express")
const router = express.Router ()
const loaiMonAnController = require ("../controllers/LoaiMonAnController")

router.delete ("/delete",loaiMonAnController.delete)
router.put ("/update",loaiMonAnController.update)
router.post("/add",loaiMonAnController.add)
router.get ("/", loaiMonAnController.index)
router.get ("/:id",loaiMonAnController.getById)

module.exports = router