const router = require("express").Router()
const { cargarPeliculas, getPerGenre20, insertarPelicula, getPelicula } = require("../controladores/peliculas")
const auth = require("../middleware/auth")

router.get("/", auth, cargarPeliculas)
router.get("/pergenre20", auth, getPerGenre20)
router.get("/:id", auth, getPelicula)
router.post("/", auth, insertarPelicula)

module.exports = router