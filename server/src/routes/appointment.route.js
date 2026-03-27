const express = require("express");
const router = express.Router();
const { showAllAppointments, createAppointment, getAppointmentsByDate, updateAppointmentStatus } = require("../controllers/appointment.controller");
const { userAuth, adminAuth } = require("../middlewares/auth");

router.post("/create", userAuth, createAppointment)
router.get("/date/:date", getAppointmentsByDate)
router.get("/admin/all", adminAuth, showAllAppointments)
router.patch("/admin/:id/status", adminAuth, updateAppointmentStatus)

module.exports = router;