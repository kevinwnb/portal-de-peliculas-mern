const router = require("express").Router()
const { login, register, activateAccount, resendActivationCode } = require("../controladores/login")

router.post("/login", login)
router.post("/new", register)
router.post("/activate", activateAccount)
router.post("/activate/resend", resendActivationCode)

module.exports = router