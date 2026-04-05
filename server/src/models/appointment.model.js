/**
 * @file appointment.model.js
 * @description Mongoose schema for salon appointments. 
 * Links a User (userId) and a Service (serviceId). Tracks booking date/time and current lifecycle status.
 */
const mongoose = require("mongoose");

/**
 * Valid lifecycle statuses for an appointment:
 * - booked: Initial state (legacy)
 * - pending: Default state when a user first schedules
 * - completed: Service has been rendered
 * - cancelled: User or Admin cancelled the appointment
 */
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