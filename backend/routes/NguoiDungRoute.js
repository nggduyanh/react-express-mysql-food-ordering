const express = require ("express")
const router = express.Router ()
const nguoiDungController = require ("../controllers/NguoiDungController")
const nguoiDung = require ("../utils/constants/NguoiDungConstant")
const addImageFile = require ("../middlewares/FormFile")

router.delete ("/delete",nguoiDungController.delete)
router.patch ("/update",addImageFile (nguoiDung.anh),nguoiDungController.update)
router.post("/add",addImageFile (nguoiDung.anh), nguoiDungController.add)
router.get ("/", nguoiDungController.index)
router.get ("/:id",nguoiDungController.getById)
router.post ("/vaitro/add", nguoiDungController.addRole)
router.delete ("/vaitro/delete", nguoiDungController.deleteRole)

module.exports = router