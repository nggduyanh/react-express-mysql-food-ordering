const express = require ("express")
const router = express.Router ()
const TaiXeController = require ("../controllers/TaiXeController")

router.delete ("/delete",TaiXeController.delete)
router.put ("/update",TaiXeController.update)
router.post("/add",TaiXeController.add)
router.get ("/", TaiXeController.index)
router.get ("/:id",TaiXeController.getById)

module.exports = router