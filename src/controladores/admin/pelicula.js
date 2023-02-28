const Pelicula = require("../../modelos/pelicula")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const path = require("path")

const crearPelicula = (req, res) => {
    var oldpath = req.file.path;
    console.log(req.file)
    var newpath = path.resolve(__dirname, "../../uploads/", uuidv4() + path.extname(req.file.originalname));
    fs.rename(oldpath, newpath, function (err) {
        if (err)
            return res.json({ error: err.message })

        let pelicula = new Pelicula()
        pelicula.name = req.body.name
        pelicula.date = new Date(req.body.date)
        pelicula.genre = req.body.genre
        pelicula.subgenre = req.body.subgenre
        pelicula.imgPath = newpath
        pelicula.save(function (err) {
            if (err)
                return res.json({ error: err.message })

            return res.json({ msg: "Pelicula saved" })
        })
    });
}

module.exports = { crearPelicula }