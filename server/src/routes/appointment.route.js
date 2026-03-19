const express = require("express");
const router = express.Router();
const { showAllAppointments, createAppointment } = require("../controllers/appointment.controller");
const { userAuth } = require("../middlewares/auth");

router.get("/all", showAllAppointments)
router.post("/create", userAuth, createAppointment)

module.exports = router;