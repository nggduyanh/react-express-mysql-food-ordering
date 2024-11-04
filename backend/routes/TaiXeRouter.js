const express = require ("express")
const router = express.Router ()
const TaiXeController = require ("../controllers/TaiXeController")
const taiXe = require ("../utils/constants/TaiXeConstant")
const addImageFile = require ("../middlewares/FormFile")
const authorize = require("../middlewares/Authorization")

router.delete ("/delete",authorize ("Driver"),TaiXeController.delete)
router.patch ("/update",authorize ("Driver"),addImageFile (taiXe.bangLai,taiXe.canCuoc),TaiXeController.update)
router.post("/add",authorize ("Driver") ,addImageFile (taiXe.bangLai,taiXe.canCuoc),TaiXeController.add)
router.get ("/", TaiXeController.index)
router.get ("/:id",TaiXeController.getById)
router.get ("/current",authorize ("Driver"),TaiXeController.getCurrentTaiXe)
module.exports = router