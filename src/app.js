const express = require("express")
const peliculasRouter = require("./rutas/peliculas")
const loginRouter = require("./rutas/login")
const adminRouter = require("./rutas/admin")
const peliculaRouter = require("./rutas/admin/pelicula")
const app = express()
const mongoose = require("mongoose")
const fs = require("fs")
mongoose.connect('mongodb://127.0.0.1:27017/mynodeapp1');
const generoRouter = require("./rutas/admin/genero")
const path = require("path")
const LoremIpsum = require("lorem-ipsum").LoremIpsum
const Pelicula = require("./modelos/pelicula")
const Genero = require("./modelos/genero")

app.use(express.json())
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")))
app.use("/inicio", (req, res) => res.send("hello"))
app.use("/api/peliculas", peliculasRouter)
app.use("/api/login", loginRouter)
app.use("/api/admin", adminRouter)
app.use("/api/admin/pelicula", peliculaRouter)
app.use("/api/admin/genero", generoRouter)
app.get("/api/generatedata", (req, res) => {
    Pelicula.remove({}, function (err) {
        if (err)
            return res.send(err.message)
    })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    Genero.find(function (err, genres) {
        if (err)
            console.log(err)

            let peliculas = []

        for (let i = 0; i < 50; i++) {
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

            let genre = genres[(getRandomInt(genres.length - 1) - 1)]
            let subgenre = genres.filter(g => g._id !== genre._id)[(getRandomInt(genres.length - 2) - 1)]

            let pelicula = new Pelicula()
            pelicula.name = lorem.generateWords(getRandomInt(2) + 1)
            pelicula.date = randomDate(new Date(2012, 0, 1), new Date())
            pelicula.genre = genre._id
            pelicula.subgenre = subgenre._id
            pelicula.imgPath = "/uploads/" + (getRandomInt(11) + ".png")
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