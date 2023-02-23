const router = require("express").Router()
const { login } = require("../controladores/admin/account")

router.post("/login", login)

module.exports = router