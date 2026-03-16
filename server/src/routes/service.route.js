const express = require("express");
const router = express.Router();
const { showAllServices } = require("../controllers/services.controller");

router.get("/", showAllServices);

module.exports = router;