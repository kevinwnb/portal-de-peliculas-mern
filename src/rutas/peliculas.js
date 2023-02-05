const router = require("express").Router()
const { cargarPeliculas, insertarPelicula } = require("../controladores/peliculas")
const auth = require("../middleware/auth")

router.get("/", auth, cargarPeliculas)
router.post("/", auth, insertarPelicula)

module.exports = router