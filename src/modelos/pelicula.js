const mongoose = require("mongoose")
const Schema = mongoose.Schema

const peliculaSchema = mongoose.Schema({ name: String, category: Schema.Types.ObjectId, year: Number })

module.exports = mongoose.model("Pelicula", peliculaSchema)