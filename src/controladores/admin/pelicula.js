const Pelicula = require("../../modelos/pelicula")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const path = require("path")

const getPeliculas = (req, res) => {
    Pelicula.find(function (err, peliculas) {
        if (err)
            return res.json({ error: err.message })

        if (!peliculas)
            return res.json({ error: "No se han encontrado películas" })

        return res.json(peliculas)
    })
}

const buscarPeliculas = (req, res) => {
    const { searchString, letter, date, genre, subgenre } = req.body
    const criteria = {
        ...(searchString && { name: searchString })
    }
    return res.json(criteria)
}

const crearPelicula = (req, res) => {
    var oldpath = req.file.path;
    let newfilename = uuidv4() + path.extname(req.file.originalname)
    var newpath = path.resolve(__dirname, "../../uploads/", newfilename);
    fs.rename(oldpath, newpath, function (err) {
        if (err)
            return res.json({ error: err.message })

        let pelicula = new Pelicula()
        pelicula.name = req.body.name
        pelicula.date = new Date(req.body.date)
        pelicula.genre = req.body.genre
        pelicula.subgenre = req.body.subgenre || undefined
        pelicula.imgPath = "/uploads/" + newfilename
        pelicula.save(function (err) {
            if (err)
                return res.json({ error: err.message })

            return res.json({ msg: "Pelicula saved" })
        })
    });
}

module.exports = { getPeliculas, crearPelicula, buscarPeliculas }