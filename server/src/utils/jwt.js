const jwt = require("jsonwebtoken");

const genToken = (id, phone) => {
    return jwt.sign(
        { id, phone },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { genToken, decodeToken }