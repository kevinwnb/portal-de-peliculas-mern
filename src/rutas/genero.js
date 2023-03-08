const router = require("express").Router()
const { getGeneros } = require("../controladores/genero")
const auth = require("../middleware/auth")

router.use(auth)
router.get("/", getGeneros)

module.exports = router