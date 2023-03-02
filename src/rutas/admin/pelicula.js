const multer = require('multer')
const upload = multer({ dest: '/uploads' })
const router = require("express").Router()
const { getPeliculas, crearPelicula } = require('../../controladores/admin/pelicula')
const auth = require("../../middleware/auth")
const adminCheck = require("../../middleware/admin-check")

router.use(auth)
router.use(adminCheck)
router.get("/", getPeliculas)
router.post("/", [upload.single("image")], crearPelicula)

module.exports = router