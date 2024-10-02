const express = require ("express")
const router = express.Router ()
const MonAnController = require ("../controllers/MonAnController")

router.delete ("/delete",MonAnController.delete)
router.put ("/update",MonAnController.update)
router.post("/add",MonAnController.add)
router.get ("/", MonAnController.index)
router.get ("/:id",MonAnController.getById)
router.get ("/nguoiban/:id", MonAnController.getByNguoiBan)

module.exports = router