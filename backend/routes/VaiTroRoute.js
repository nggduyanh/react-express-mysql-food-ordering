const express = require ("express")
const router = express.Router ()
const VaiTroController = require ("../controllers/VaiTroController")

router.delete ("/delete",VaiTroController.delete)
router.put ("/update",VaiTroController.update)
router.post("/add",VaiTroController.add)
router.get ("/", VaiTroController.index)
router.get ("/:id",VaiTroController.getById)

module.exports = router