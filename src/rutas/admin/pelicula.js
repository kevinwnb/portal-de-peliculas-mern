const multer = require('multer')
const upload = multer({ dest: '/uploads' })
const router = require("express").Router()
const { getPeliculas, crearPelicula } = require('../../controladores/admin/pelicula')
const auth = require("../../middleware/auth")

router.use(auth)
router.get("/", getPeliculas)
router.post("/", [upload.single("image")], crearPelicula)

module.exports = router