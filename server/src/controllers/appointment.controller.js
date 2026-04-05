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

const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) throw new ApiError(400, "Status is required");

    const appointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    );

    if (!appointment) throw new ApiError(404, "Appointment not found");

    return ApiResponse(res, 200, "Appointment status updated", appointment);
});

const getUserAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ userId: req.user._id })
        .populate({ path: "serviceId" })
        .sort({ date: -1 });
    return ApiResponse(res, 200, "User appointments fetched successfully", appointments);
});

const cancelUserAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const appointment = await Appointment.findOne({ _id: id, userId: req.user._id });
    if (!appointment) throw new ApiError(404, "Appointment not found");
    if (appointment.status === "completed") {
        throw new ApiError(400, "Cannot cancel a completed appointment");
    }
    if (appointment.status === "cancelled") {
        throw new ApiError(400, "Appointment is already cancelled");
    }
    appointment.status = "cancelled";
    await appointment.save();
    return ApiResponse(res, 200, "Appointment cancelled successfully", appointment);
});

module.exports = { showAllAppointments, createAppointment, getAppointmentsByDate, updateAppointmentStatus, getUserAppointments, cancelUserAppointment };