const express = require("express");
const app = express();

// common middlewares
app.use(express.json());

// routes
const healthcheckRouter = require('./healthcheck/index');
app.use("/", healthcheckRouter);

module.exports = app;