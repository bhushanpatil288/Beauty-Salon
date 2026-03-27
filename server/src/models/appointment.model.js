const mongoose = require("mongoose");

const status = ['booked', 'pending', 'completed', 'cancelled'];

const appointmentModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        require: true
    },
    time: {
        type: String,       // 24 hour format 00:00
        require: true
    },
    status: {
        type: String,
        enum: status,
        default: 'pending',
    },
    notes: {
        type: String,
        trim: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service"
    },
    duration: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('appointment', appointmentModel);