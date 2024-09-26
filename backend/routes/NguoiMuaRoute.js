const express = require ("express")
const router = express.Router ()
const nguoiMuaController = require ("../controllers/NguoiMuaController")

router.delete ("/delete",nguoiMuaController.delete)
router.put ("/update",nguoiMuaController.update)
router.post("/add",nguoiMuaController.add)
router.get ("/", nguoiMuaController.index)
router.get ("/:id",nguoiMuaController.getById)

module.exports = router