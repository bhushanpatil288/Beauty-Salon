const express = require("express");
const app = express();
const cors = require("cors");
const { seedServices } = require("./seed/seed");

// common middlewares
app.use(express.json());
app.use(cors());

// routes
const healthcheckRouter = require('./healthcheck/index');
const serviceRouter = require("./routes/service.route");

app.use("/", healthcheckRouter);
app.use("/services", serviceRouter);

// dummy data
// seedServices();

module.exports = app;