const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = require("express").Router()
const {crearPelicula} = require('../../controladores/admin/pelicula')

router.post("/api/admin/peliculas", upload.single("image"), crearPelicula)