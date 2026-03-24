const Appointment = require("../models/appointment.model");

const showAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate({ path: "userId", select: "-password" });
        res.send(appointments);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}

const createAppointment = async (req, res) => {
    try {
        const { serviceId, date, time, notes, duration } = req.body;
        const userId = req.user._id;

        const newAppointment = new Appointment({
            userId,
            serviceId,
            date,
            time,
            notes,
            duration,
            status: 'booked'
        });
        await newAppointment.save();
        res.status(201).send(newAppointment);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Failed to book appointment" });
    }
}

const getAppointmentsByDate = async (req, res) => {
    try {
        const date = req.params.date;
        const start = new Date(date);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);

        const appointments = await Appointment.find({
            date: {
                $gte: start,
                $lt: end
            }
        });
        res.send(appointments);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Failed to get appointments" });
    }
}
module.exports = { showAllAppointments, createAppointment, getAppointmentsByDate };