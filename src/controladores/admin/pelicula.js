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

const getPelicula = (req, res) => {
    Pelicula.findById(req.params.id, {}, function (err, doc) {
        if (err)
            return res.json({ error: err.message })

        if (!doc)
            return res.json({ error: "No se ha encontrado nada con este id" })

        return res.json(doc)
    })
}

const deletePelicula = (req, res) => {
    Pelicula.findByIdAndDelete(req.body.id, function (err, doc) {
        if (err)
            return res.json({ error: err.message })

        if (!doc)
            return res.json({ error: "Error al eliminar la película" })

        return res.json({ msg: "Película eliminada con éxito" })
    })
}

const buscarPeliculas = async (req, res) => {
    const search = async (query, skip, limit) => {
        let peliculas = await Pelicula.find(query).skip(skip).limit(limit).exec()
        return peliculas
    }

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const { searchString, initial, date, genre, subgenre } = req.body

    let query = {
        ...(searchString && !initial && {
            name: {
                $in: [(new RegExp(".*" + searchString + ".*", "i"))]
            }
        }),
        ...(!searchString && initial && {
            name: {
                $in: [(new RegExp('^' + initial, "i"))]
            }
        }),
        ...(searchString && initial && {
            $and: [
                { name: { $regex: (new RegExp(".*" + searchString + ".*", "i")) } },
                { name: { $regex: (new RegExp('^' + initial, "i")) } }
            ]
        }),
        ...(date && { date: { $gte: new Date(date), $lt: (new Date(date)).addDays(1) } }),
        ...(genre && { genre: genre }),
        ...(subgenre && { subgenre: subgenre })
    }

    let peliculas = await search(query, req.body.skip, req.body.limit).then(data => data)

    // if (initial) {
    //     peliculas = peliculas.filter(p => p.name.substring(0, 1) === initial.toLocaleLowerCase())
    // }

    if (peliculas.length > 0)
        return res.json({ peliculas: peliculas })

    return res.status(404).json({ error: "No se han encontrado películas" })
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

const updatePelicula = async (req, res) => {
    if (req.file) {
        var oldpath = req.file.path;
        let newfilename = uuidv4() + path.extname(req.file.originalname)
        var newpath = path.resolve(__dirname, "../../uploads/", newfilename);
        fs.rename(oldpath, newpath, function (err) {
            if (err)
                return res.json({ error: err.message })

            let imgPath = "/uploads/" + newfilename
            updateDoc(imgPath)
        })
    }
    else
        updateDoc(req.body.imgPath)

    function updateDoc(imgPath) {
        console.log(imgPath)
        Pelicula.findById(req.body._id, {}, function (err, doc) {
            if (err)
                return res.json({ error: err.message })

            if (!doc)
                return res.json({ error: "No se han encontrado la película" })

            if ((new Date(doc.updatedAt)).toISOString() !== (new Date(req.body.updatedAt)).toISOString())
                return res.json({ error: "Esta película ha sido editada por otro administrador hace un momento, refresca la página para obtener la versión más reciente" })

            doc.name = req.body.name
            doc.date = new Date(req.body.date)
            doc.genre = req.body.genre
            doc.subgenre = req.body.subgenre || undefined
            doc.imgPath = imgPath

            doc.save().then(savedDoc => {
                if (savedDoc !== doc)
                    return res.json({ error: "Error al guardar la película" })

                return res.json({ msg: "La película ha sido actualizada con éxito" })
            })
        })
    }
}

module.exports = { getPelicula, getPeliculas, crearPelicula, buscarPeliculas, updatePelicula, deletePelicula }