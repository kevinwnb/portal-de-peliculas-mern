const router = require("express").Router()
const peliculasController = require("../controladores/peliculas")
const auth = require("../middleware/auth")

router.get("/", auth, peliculasController.cargarPeliculas)
router.get("/pergenre20", auth, peliculasController.getPerGenre20)
router.get("/estrenos", peliculasController.getEstrenos)
router.post("/buscar", peliculasController.getSearch)
router.get("/:id", auth, peliculasController.getPelicula)
router.post("/", auth, peliculasController.insertarPelicula)

module.exports = router