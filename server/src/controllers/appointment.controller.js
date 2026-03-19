const Appointment = require("../models/appointment.model");

const showAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.send(appointments);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
}

const createAppointment = async (req, res) => {
    try {
        const { serviceId, date, time, notes } = req.body;
        const userId = req.user._id;

        const newAppointment = new Appointment({
            userId,
            serviceId,
            date,
            time,
            notes,
            status: 'booked'
        });
        await newAppointment.save();
        res.status(201).send(newAppointment);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Failed to book appointment" });
    }
}

module.exports = { showAllAppointments, createAppointment };