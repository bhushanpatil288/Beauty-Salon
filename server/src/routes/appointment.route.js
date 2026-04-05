const express = require("express");
const router = express.Router();
const { showAllAppointments, createAppointment, getAppointmentsByDate, updateAppointmentStatus, getUserAppointments, cancelUserAppointment } = require("../controllers/appointment.controller");
const { userAuth, adminAuth } = require("../middlewares/auth");

router.post("/create", userAuth, createAppointment)
router.get("/date/:date", getAppointmentsByDate)
router.get("/user/mine", userAuth, getUserAppointments)
router.patch("/user/:id/cancel", userAuth, cancelUserAppointment)
router.get("/admin/all", adminAuth, showAllAppointments)
router.patch("/admin/:id/status", adminAuth, updateAppointmentStatus)

module.exports = router;