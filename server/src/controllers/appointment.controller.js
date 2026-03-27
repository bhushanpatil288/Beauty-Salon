const Appointment = require("../models/appointment.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const showAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find().populate({
        path: "userId",
        select: "-password",
    }).populate({
        path: "serviceId"
    });
    return ApiResponse(res, 200, "Appointments fetched successfully", appointments);
});

const createAppointment = asyncHandler(async (req, res) => {
    const { serviceId, date, time, notes, duration } = req.body;
    if (!serviceId || !date || !time) {
        throw new ApiError(400, "serviceId, date, and time are required");
    }

    const newAppointment = await Appointment.create({
        userId: req.user._id,
        serviceId,
        date,
        time,
        notes,
        duration,
        status: "pending",
    });
    return ApiResponse(res, 201, "Appointment booked successfully", newAppointment);
});

const getAppointmentsByDate = asyncHandler(async (req, res) => {
    const start = new Date(req.params.date);
    if (isNaN(start.getTime())) throw new ApiError(400, "Invalid date format");

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const appointments = await Appointment.find({
        date: { $gte: start, $lt: end },
    });
    return ApiResponse(res, 200, "Appointments fetched successfully", appointments);
});

module.exports = { showAllAppointments, createAppointment, getAppointmentsByDate };