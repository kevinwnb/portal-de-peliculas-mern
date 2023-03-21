const express = require("express")
const peliculasRouter = require("./rutas/peliculas")
const loginRouter = require("./rutas/login")
const adminRouter = require("./rutas/admin")
const peliculaRouter = require("./rutas/admin/pelicula")
const app = express()
const mongoose = require("mongoose")
const fs = require("fs")
mongoose.connect('mongodb://127.0.0.1:27017/portal_de_peliculas');
const generoRouter = require("./rutas/admin/genero")
const path = require("path")
const LoremIpsum = require("lorem-ipsum").LoremIpsum
const Pelicula = require("./modelos/pelicula")
const Genero = require("./modelos/genero")
const usuarioRouter = require("./rutas/admin/usuario")
const generoNoAdminRouter = require("./rutas/genero")

app.use(express.json())
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")))
app.use("/inicio", (req, res) => res.send("hello"))
app.use("/api/peliculas", peliculasRouter)
app.use("/api/login", loginRouter)
app.use("/api/genero", generoNoAdminRouter)
app.use("/api/admin", adminRouter)
app.use("/api/admin/pelicula", peliculaRouter)
app.use("/api/admin/genero", generoRouter)
app.use("/api/admin/usuario", usuarioRouter)
app.get("/api/generatedata", (req, res) => {
    Pelicula.remove({}, function (err) {
        if (err)
            return res.send(err.message)
    })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    Genero.find(function (err, genres) {
        if (err)
            console.log(err)

        let peliculas = []

        for (let i = 0; i < 1000; i++) {
            const lorem = new LoremIpsum({
                sentencesPerParagraph: {
                    max: 8,
                    min: 4
                },
                wordsPerSentence: {
                    max: 16,
                    min: 4
                }
            })

            let genre = genres[(getRandomInt(genres.length) - 1)]
            let subgenre = genres.filter(g => g._id !== genre._id)[(getRandomInt(genres.length - 2) - 1)]

            let pelicula = new Pelicula()
            pelicula.name = capitalizeFirstLetter(lorem.generateWords(getRandomInt(2) + 1))
            let date = new Date()
            pelicula.date = randomDate(new Date(2012, 0, 1), date.addDays(45))
            pelicula.genre = genre._id
            pelicula.subgenre = subgenre._id
            pelicula.imgPath = "/uploads/" + (getRandomInt(11) + ".png")
            pelicula.description = lorem.generateParagraphs(getRandomInt(4) + 1)
            pelicula.likeAverage = getRandomInt(4) + 1
            peliculas.push(pelicula)
        }

        Pelicula.create(peliculas, function (err, result) {
            if (err)
                return res.send("failed to save")

            return res.send("generated!")
        })
    })
})

app.listen(5000, () => console.log("listening to 5000"))