const serviceModel = require("../models/service.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const showAllServices = asyncHandler(async (req, res) => {
    const services = await serviceModel.find().sort({ name: 1 });
    return ApiResponse(res, 200, "Services fetched successfully", services);
});

module.exports = { showAllServices };