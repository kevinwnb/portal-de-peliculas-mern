const router = require("express").Router()
const { getGenres } = require("../../controladores/admin/genero")
const auth = require("../../middleware/auth")

router.get("/", auth, getGenres)

module.exports = router