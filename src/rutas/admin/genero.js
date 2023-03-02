const router = require("express").Router()
const { getGenres } = require("../../controladores/admin/genero")
const auth = require("../../middleware/auth")
const adminCheck = require("../../middleware/admin-check")

router.use(auth)
router.use(adminCheck)
router.get("/", auth, getGenres)

module.exports = router