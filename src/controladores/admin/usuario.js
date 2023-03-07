const Usuario = require("../../modelos/usuario")
const bcrypt = require("bcrypt")

const searchUsuarios = (req, res) => {
    const query = {
        ...(req.body.name && { name: { $regex: ".*" + req.body.name + ".*", $options: "i" } }),
        ...(req.body.lastName && { lastName: { $regex: ".*" + req.body.lastName + ".*", $options: "i" } }),
        ...(req.body.email && { email: { $regex: ".*" + req.body.email + ".*", $options: "i" } })
    }
    Usuario.find(query, function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "No se han encontrado usuarios" })

        return res.json(docs)
    })
}

const getUsuarios = (req, res) => {
    Usuario.find(function (err, docs) {
        if (err)
            return res.json({ error: err.message })

        if (!docs)
            return res.json({ error: "No se han encontrado usuarios" })

        return res.json(docs)
    })
}

const getUsuario = (req, res) => {
    Usuario.findById(req.params.id, function (err, doc) {
        if (err)
            return res.json({ error: err.message })

        if (!doc)
            return res.json({ error: "No se ha encontrado el usuario con el id especificado" })

        return res.json(doc)
    })
}

const createUsuario = (req, res) => {
    let usuario = new Usuario()
    usuario.name = req.body.name
    usuario.lastName = req.body.lastName
    usuario.email = req.body.email
    usuario.password = bcrypt.hashSync(req.body.password, 10)
    usuario.save().then(savedDoc => {
        if (!savedDoc)
            return res.json({ error: "Error al crear el usuario nuevo" })

        return res.json({ msg: "Usuario creado con éxito" })
    })
}

const updateUsuario = (req, res) => {
    Usuario.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }, {}, function (err, doc) {
        if (err)
            return res.json({ error: err.message })

        if (!doc)
            return res.json({ error: "No se ha podido actualizar el usuario" })

        return res.json(doc)
    })
}

const deleteUsuario = (req, res) => {
    Usuario.findByIdAndDelete(req.body.id, {}, function (err, doc) {
        if (err)
            return res.json({ error: err.message })

        if (!doc)
            return res.json({ error: "No se ha podido eliminar el usuario" })

        return res.json(doc)
    })
}

module.exports = { searchUsuarios, getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario }