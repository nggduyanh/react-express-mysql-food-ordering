const express = require ("express")
const router = express.Router ()
const TaiXeController = require ("../controllers/TaiXeController")
const taiXe = require ("../utils/constants/TaiXeConstant")
const addImageFile = require ("../middlewares/FormFile")

router.delete ("/delete",TaiXeController.delete)
router.patch ("/update",addImageFile (taiXe.bangLai,taiXe.canCuoc),TaiXeController.update)
router.post("/add", addImageFile (taiXe.bangLai,taiXe.canCuoc),TaiXeController.add)
router.get ("/", TaiXeController.index)
router.get ("/:id",TaiXeController.getById)
router.get ("/current",TaiXeController.getCurrentTaiXe)

module.exports = router