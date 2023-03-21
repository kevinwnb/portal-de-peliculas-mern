const mongoose = require("mongoose")
const Usuario = require("../modelos/usuario")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

const login = (req, res) => {
    Usuario.findOne({ email: req.body.email }, function (err, user) {
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
                
                if (!user.activation.activated)
                    return res.json({ error: "Esta cuenta está pendiente de activación" })
                
            if (result) {
                let token = jwt.sign({ userId: user._id }, "1234", function (err, token) {
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

const register = (req, res) => {
    Usuario.exists({ email: req.body.email }, function (err, doc) {
        if (err)
            return res.json({ error: err.message })

        if (doc)
            return res.json({ error: "Una cuenta con este email ya existe" })

        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err)
                return res.json({ error: err.message })

            const activationCode = Math.floor(100000 + Math.random() * 900000)

            Usuario.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hash, role: "user", activation: { activated: false, activationCode: activationCode, codeExpiryDate: new Date((new Date()).getTime() + 5 * 60000) } }, async function (err, user) {
                if (err)
                    return res.json({ error: err.message })

                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    name: "ethereal.com",
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Movie Portal 👻" <foo@example.com>', // sender address
                    to: req.body.email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Tu código de verificación es: " + activationCode, // plain text body
                    html: "Tu código de verificación es: <b>" + activationCode + "</b>", // html body
                });

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                return res.json({ msg: "Usuario creado" })
            })
        });
    })
}

const resendActivationCode = (req, res) => {
    Usuario.findOne({ email: req.body.email }, async function (err, user) {
        if (err)
            return res.json({ error: err.message })

        if (!user)
            return res.json({ error: "Usuario inexistente" })

        const activationCode = Math.floor(100000 + Math.random() * 900000)
        const newDate = new Date((new Date()).getTime() + 5 * 60000)

        user.activation.activationCode = activationCode
        user.activation.codeExpiryDate = newDate

        await user.save()

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            name: "ethereal.com",
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Movie Portal 👻" <foo@example.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Tu código de verificación es: " + activationCode, // plain text body
            html: "Tu código de verificación es: <b>" + activationCode + "</b>", // html body
        });

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return res.json({ msg: "Nuevo código de activación enviado" })
    })
}

const activateAccount = (req, res) => {
    Usuario.findOne({ email: req.body.email }, function (err, user) {
        if (err)
            return res.json({ error: err.message })

        if (!user)
            return res.json({ error: "Usuario inexistente" })

        if (user.activation.activated) {
            return res.json({ success: "Cuenta activada, gracias", verified: true })
        }

        if (req.body.activationCode != user.activation.activationCode)
            return res.json({ error: "El código de activación no es válido" })

        if (new Date() > new Date(user.activation.codeExpiryDate))
            return res.json({ error: "Código de activación expirado" })

        user.activation.activated = true
        user.save().then(savedDoc => {
            if (savedDoc === user) {
                return res.json({ verified: true, success: "Cuenta activada, gracias" })
            }
            else {
                return res.json({ error: "La activación ha fallado" })
            }
        })
    })
}

module.exports = { login, register, activateAccount, resendActivationCode }