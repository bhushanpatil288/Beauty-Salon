const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { hashPass } = require("../utils/bcrypt");
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
            sameSite: "lax"
        });
        console.log("sending response");
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

module.exports = { signup }