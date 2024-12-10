const express = require ("express")
const router = express.Router ()
const AuthController = require ("../controllers/AuthController")

router.post ("/signup",AuthController.signup)
router.post ("/login",AuthController.login)
router.post ("/recoverpassword/mail", AuthController.resetPasswordByMail)
router.post ("/verifyOTP", AuthController.verifyOTP)
router.post ("/upgradeAdmin", AuthController.upgradeAdmin)
module.exports = router