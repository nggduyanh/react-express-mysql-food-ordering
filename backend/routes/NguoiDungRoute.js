const express = require ("express")
const router = express.Router ()
const nguoiDungController = require ("../controllers/NguoiDungController")

router.delete ("/delete",nguoiDungController.delete)
router.put ("/update",nguoiDungController.update)
router.post("/add",nguoiDungController.add)
router.get ("/", nguoiDungController.index)
router.get ("/:id",nguoiDungController.getById)
router.post ("/vaitro/add", nguoiDungController.addRole)
router.delete ("/vaitro/delete", nguoiDungController.deleteRole)

module.exports = router