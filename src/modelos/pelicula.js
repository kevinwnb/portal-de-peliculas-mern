const mongoose = require("mongoose")
const Schema = mongoose.Schema

const peliculaSchema = mongoose.Schema({ name: String, genre: Schema.Types.ObjectId, subgenre: Schema.Types.ObjectId, date: Date, imgPath: String })

module.exports = mongoose.model("Pelicula", peliculaSchema)