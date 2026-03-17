const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { seedServices } = require("./seed/seed");

// common middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// routes
const healthcheckRouter = require('./healthcheck/index');
const serviceRouter = require("./routes/service.route");
const appointmentRouter = require("./routes/appointment.route");
const authRouter = require("./routes/auth.route");

app.use("/", healthcheckRouter);
app.use("/services", serviceRouter);
app.use("/appointments", appointmentRouter);
app.use("/auth", authRouter);

// dummy data
seedServices();

module.exports = app;