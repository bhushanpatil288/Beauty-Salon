const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ApiError = require("./utils/ApiError");
const IP_ADDRESS = process.env.IP_ADDRESS;

// Common middlewares
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://[IP_ADDRESS]"], credentials: true }));
app.use(cookieParser());

// Routes
const healthcheckRouter = require("./healthcheck/index");
const serviceRouter = require("./routes/service.route");
const appointmentRouter = require("./routes/appointment.route");
const authRouter = require("./routes/auth.route");

app.use("/", healthcheckRouter);
app.use("/services", serviceRouter);
app.use("/appointments", appointmentRouter);
app.use("/auth", authRouter);

// Global error handler — catches anything thrown/passed via next(err)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
    console.error(`[${req.method}] ${req.originalUrl} →`, err.message);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Unexpected errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

module.exports = app;