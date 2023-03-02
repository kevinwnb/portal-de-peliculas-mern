const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(403).json({ error: 'No credentials sent!' });

    let token = req.headers.authorization.replace("Bearer ", "")

    // verify a token symmetric
    jwt.verify(token, '1234', function (err, decoded) {
        if (err)
            return res.status(404).json({ error: "invalid token" })

        if (decoded.role === "admin")
            res.locals.role = "admin"

        console.log(decoded) // bar
    });

    next();
}

module.exports = auth