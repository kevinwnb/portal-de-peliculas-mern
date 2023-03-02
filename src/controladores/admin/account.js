const bcrypt = require("bcrypt")
const Usuario = require("../../modelos/usuario")
const jwt = require("jsonwebtoken")

const login = (req, res) => {
    Usuario.findOne({ userId: Number(req.body.userId) }, function (err, user) {
        if (err)
            return res.json({ error: err.message })

        if (!user)
            return res.json({ error: "Credenciales incorrectos" })


        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err)
                return res.json({ error: err.message })

            if (!result) {
                return res.json({ error: "Credenciales incorrectos" })
            }

            //if (!user.activation.activated)
            //  return res.json({ error: "Esta cuenta está pendiente de activación" })

            if (result) {
                let token = jwt.sign({ userId: user._id, role: user.role }, "1234", function (err, token) {
                    if (err)
                        console.log(err)

                    return res.json({
                        token: token
                    })
                })
            }
        })
    });
}

module.exports = { login }