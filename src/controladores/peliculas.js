const Pelicula = require("../modelos/pelicula")

const cargarPeliculas = (req, res) => {
    return res.json(["1", "2"])
}

const insertarPelicula = (req, res) => {
    Pelicula.create({ name: 'LQSA', category: "abcd", year: 2010 }, function (err, pelicula) {
        if (err) return handleError(err);
        console.log("Película created")
        return res.json(pelicula).status(200)
    });
}

module.exports = { cargarPeliculas, insertarPelicula }