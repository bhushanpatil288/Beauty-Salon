/**
 * @file service.model.js
 * @description Mongoose schema for available salon services. 
 * Includes descriptive headings, pricing, and required duration in minutes.
 */
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true,
    },
    subHeading: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('service', serviceSchema);