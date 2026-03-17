const jwt = require("jsonwebtoken");

const genToken = (id, phone) => {
    return jwt.sign(
        { id, phone },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

module.exports = { genToken }