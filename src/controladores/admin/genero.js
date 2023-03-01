const Genero = require("../../modelos/genero")


const getGenres = (req, res) => {
    Genero.find(function (err, genres) {
        if (err)
            return res.json({ error: err.message })

        if (!genres)
            return res.json({ error: "No se han encontrado géneros" })

        return res.json(genres)
    })
}

module.exports = { getGenres }