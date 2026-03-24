const { decodeToken } = require("../utils/jwt.js");
const userModel = require("../models/user.model.js");

const userAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        console.log("Token received:", token ? "Yes" : "No");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = decodeToken(token);
        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const adminAuth = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        console.log("Token received:", token ? "Yes" : "No");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = decodeToken(token);
        const user = await userModel.findById(decodedToken.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { userAuth, adminAuth };