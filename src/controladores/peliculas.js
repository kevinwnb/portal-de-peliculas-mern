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
    Genero.find(function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "No se han encontrado géneros" })

        var peliculas = []

        docs.forEach(async (d, index) => {
            let pelis = await Pelicula.find({ genre: d._id }).limit(8).exec()

            peliculas = [...peliculas, ...pelis]

            if (index === docs.length - 1)
                return res.json(peliculas)

        })
    })
}

const getEstrenos = (req, res) => {
    Pelicula.find({ date: { $gt: (new Date(Date.now())) } }, {}, function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "Actualmente no hay ningún estreno disponible" })

        if (docs && docs.length === 0)
            return res.json({ error: "Actualmente no hay ningún estreno disponible" })

        return res.json(docs)
    })
}

const getSearch = (req, res) => {
    if (!req.body.searchString)
        return res.json([])

    Pelicula.find({
        $or: [
            {
                "name": { $regex: ".*" + req.body.searchString + ".*", $options:"i" }
            },
            {
                "genre.name": { $regex: ".*" + req.body.searchString + ".*", $options:"i" }
            },
            {
                "subgenre.name": { $regex: ".*" + req.body.searchString + ".*", $options:"i" }
            },
        ]
    }, function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "No hay ningún resultado" })

        if (docs && docs.length === 0)
            return res.json({ error: "No hay ningún resultado con esta búsqueda" })

        return res.json(docs)
    }).populate(["genre", "subgenre"]).limit(36)
}

module.exports = { cargarPeliculas, getPerGenre20, insertarPelicula, getPelicula, getEstrenos, getSearch }