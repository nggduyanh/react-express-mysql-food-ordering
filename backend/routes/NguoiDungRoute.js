const express = require ("express")
const router = express.Router ()
const nguoiDungController = require ("../controllers/NguoiDungController")
const nguoiDung = require ("../utils/constants/NguoiDungConstant")
const addImageFile = require ("../middlewares/FormFile")

router.delete ("/delete",nguoiDungController.delete)
router.patch ("/update",addImageFile (nguoiDung.anh),nguoiDungController.update)
router.get ("/", nguoiDungController.index)
router.get("/current",nguoiDungController.getCurrentUser)
// router.get ("/:id",nguoiDungController.getById)
router.get ("/search/:keyword",nguoiDungController.searchSeller)
module.exports = router