const mongoose = require("mongoose")
const Schema = mongoose.Schema

const peliculaSchema = mongoose.Schema({ name: String, category: Number, subcategory: Number, date: Date, imgPath: String })

module.exports = mongoose.model("Pelicula", peliculaSchema)