const Genero = require("../modelos/genero")
const Pelicula = require("../modelos/pelicula")

const cargarPeliculas = (req, res) => {
    Pelicula.find(function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "No se han encontrado películas" })

        return res.json(docs)
    }).limit(req.query.limit)
}

const getPelicula = (req, res) => {
    Pelicula.findById(req.params.id, {}, function (err, doc) {
        if (err)
            return res.json({ error: err.message })

        if (!doc)
            return res.json({ error: "No se ha encontrado la película con el id especificado" })

        return res.json(doc)
    })
}

const insertarPelicula = (req, res) => {
    Pelicula.create({ name: 'LQSA', category: "abcd", year: 2010 }, function (err, pelicula) {
        if (err) return handleError(err);
        console.log("Película created")
        return res.json(pelicula).status(200)
    });
}

const getPerGenre20 = (req, res) => {
    let peliculas = []
    Genero.find(function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "No se han encontrado géneros" })


        docs.forEach(d => {
            Pelicula.find({ genre: d._id }, function (err, doc) {
                if (err)
                    return res.json({ error: err })

                if (!doc)
                    return res.json({ error: "No se han encontrado la película" })

                peliculas.push(doc)
            }).limit(8).exec()
        })

        return res.json(peliculas)
    })
}

module.exports = { cargarPeliculas, getPerGenre20, insertarPelicula, getPelicula }