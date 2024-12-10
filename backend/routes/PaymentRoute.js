const express = require ("express")
const router = express.Router ()
const {CreatePayment,CallBack}  = require("../controllers/PaymentController")

router.post("/create",CreatePayment)
router.post("/callback",CallBack)

module.exports=router       