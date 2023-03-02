const mongoose = require("mongoose")
const Schema = mongoose.Schema

const peliculaSchema = mongoose.Schema({ name: String, genre: { type: Schema.Types.ObjectId, ref: "generos", required: [true, "Género seleccionado inexistente"] }, subgenre: { type: Schema.Types.ObjectId, ref: "generos", required: false }, date: Date, imgPath: String })

module.exports = mongoose.model("Pelicula", peliculaSchema)