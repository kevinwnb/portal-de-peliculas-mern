const multer = require('multer')
const upload = multer({ dest: '/uploads' })
const router = require("express").Router()
const { updatePelicula, deletePelicula, getPeliculas, getPelicula, crearPelicula, buscarPeliculas } = require('../../controladores/admin/pelicula')
const auth = require("../../middleware/auth")
const adminCheck = require("../../middleware/admin-check")

router.use(auth)
router.use(adminCheck)
router.get("/", getPeliculas)
router.get("/:id", getPelicula)
router.post("/buscar", buscarPeliculas)
router.put("/", [upload.single("newImage")], updatePelicula)
router.post("/", [upload.single("image")], crearPelicula)
router.delete("/", deletePelicula)

module.exports = router