const Genero = require("../modelos/genero")


const getGeneros = (req, res) => {
    Genero.find(function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "No se han encontrado géneros" })

        return res.json(docs)
    })
}

module.exports = { getGeneros }