const express = require ("express")
const router = express.Router ()
const nguoiBanController = require ("../controllers/NguoiBanController")

router.delete ("/delete",nguoiBanController.delete)
router.put ("/update",nguoiBanController.update)
router.post("/add",nguoiBanController.add)
router.get ("/", nguoiBanController.index)
router.get ("/:id",nguoiBanController.getById)
router.get ("/:id/loainguoiban",nguoiBanController.getLoaiNguoiBan)
router.post ("/:id/loainguoiban/add",nguoiBanController.addLoaiNguoiBan)
router.delete ("/:id/loainguoiban/:idLoaiNguoiBan/delete", nguoiBanController.deleteLoaiNguoiBan)

module.exports = router