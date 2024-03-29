const mongoose = require("mongoose")
const Schema = mongoose.Schema

const peliculaSchema = mongoose.Schema({ name: String, genre: { type: Schema.Types.ObjectId, ref: "Genero", required: [true, "Género seleccionado inexistente"] }, subgenre: { type: Schema.Types.ObjectId, ref: "Genero", required: false }, date: Date, imgPath: String, description: String, likeAverage: Number }, { timestamps: true })

module.exports = mongoose.model("Pelicula", peliculaSchema)