/**
 * @file user.model.js
 * @description Mongoose schema for user accounts. 
 * Supports both regular customers and salon administrators via the 'role' field.
 */
const mongoose = require("mongoose");


const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("user", userModel);

