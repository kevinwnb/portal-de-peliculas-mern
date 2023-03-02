


const adminCheck = (req, res, next) => {
    if (res.locals.role !== "admin")
        return res.json({ error: "Este usuario no es administrador" })

    next()
}

module.exports = adminCheck