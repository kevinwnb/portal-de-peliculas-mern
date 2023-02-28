const express = require("express")
const peliculasRouter = require("./rutas/peliculas")
const loginRouter = require("./rutas/login")
const adminRouter = require("./rutas/admin")
const peliculaRouter = require("./rutas/admin/pelicula")
const app = express()
const mongoose = require("mongoose")
const fs = require("fs")
mongoose.connect('mongodb://127.0.0.1:27017/mynodeapp1');

app.use(express.json())
app.use("/inicio", (req, res) => res.send("hello"))
app.use("/api/peliculas", peliculasRouter)
app.use("/api/login", loginRouter)
app.use("/api/admin", adminRouter)
app.use("/api/admin/pelicula", peliculaRouter)

app.listen(5000, () => console.log("listening to 5000"))