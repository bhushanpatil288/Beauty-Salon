const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { hashPass, comparePass } = require("../utils/bcrypt");
const { genToken } = require("../utils/jwt");

const signup = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.array()[0].msg
            })
        }

        const { name, phone, email, password } = req.body;

        const alreadyExists = await userModel.findOne({ phone });
        if (alreadyExists) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await hashPass(password);

        let user = {}
        if (!email) {
            user = { name, phone, password: hashedPassword }
        } else {
            user = { name, phone, email, password: hashedPassword }
        }

        const newUser = await userModel.create(user);
        const token = await genToken(newUser._id, newUser.phone);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        })

    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", { path: "/" });
        return res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
}

const login = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) {
            return res.status(400).json({
                message: error.array()[0].msg
            })
        }

        const { phone, password } = req.body;

        const user = await userModel.findOne({ phone });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await comparePass(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const token = genToken(user._id, user.phone);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });
        return res.status(200).json({
            message: "User logged in successfully",
            user: user
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        })
    }
}

const adminSignup = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                message: error.array()[0].msg
            })
        }

        const { name, phone, email, password } = req.body;

        const alreadyExists = await userModel.findOne({ phone });
        if (alreadyExists) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await hashPass(password);

        const newUser = await userModel.create({ name, phone, email, password: hashedPassword, role: "admin" });
        const token = await genToken(newUser._id, newUser.phone);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        })

    } catch (e) {
        return res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
}

module.exports = { signup, logout, login, adminSignup }