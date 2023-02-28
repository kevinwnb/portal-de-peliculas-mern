const multer = require('multer')
const upload = multer({ dest: '/uploads' })
const router = require("express").Router()
const { crearPelicula } = require('../../controladores/admin/pelicula')
const auth = require("../../middleware/auth")

router.use(auth)
router.post("/", [auth, upload.single("image")], crearPelicula)

module.exports = router