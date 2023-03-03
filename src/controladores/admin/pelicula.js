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

const buscarPeliculas = async (req, res) => {
    const search = async (query, skip, limit) => {
        let peliculas = await Pelicula.find(query).skip(skip).limit(limit).exec()
        return peliculas
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const { searchString, initial, date, genre, subgenre } = req.body
    let query = {
        ...(searchString && { name: { $regex: '.*' + searchString + '.*' } }),
        //...(initial && { name: {$regex : "^" + initial} }),
        ...(date && { date:{ $gte: new Date(date), $lt: (new Date(date)).addDays(1) } }),
        ...(genre && { genre: genre }),
        ...(subgenre && { subgenre: subgenre })
    }

    let peliculas = await search(query, req.body.skip, req.body.limit).then(data => data)

    if (initial) {
        peliculas = peliculas.filter(p => p.name.substring(0, 1) === initial.toLocaleLowerCase())
    }

    if (peliculas)
        return res.json(peliculas)

    return res.json({ error: "No se han encontrado películas" })
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