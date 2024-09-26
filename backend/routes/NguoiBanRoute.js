const express = require ("express")
const router = express.Router ()
const nguoiBanController = require ("../controllers/NguoiBanController")

router.delete ("/delete",nguoiBanController.delete)
router.put ("/update",nguoiBanController.update)
router.post("/add",nguoiBanController.add)
router.get ("/", nguoiBanController.index)
router.get ("/:id",nguoiBanController.getById)

module.exports = router