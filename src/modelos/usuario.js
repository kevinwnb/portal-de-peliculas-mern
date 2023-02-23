const mongoose = require("mongoose")
const Schema = require("mongoose").Schema

const UsuarioSchema = Schema({ firstName: String, lastName: String, email: String, password: String, role: String, activation: { activated: Schema.Types.Boolean, activationCode: Number, codeExpiryDate: Schema.Types.Date }, userId: Number })

module.exports = mongoose.model("Usuario", UsuarioSchema)