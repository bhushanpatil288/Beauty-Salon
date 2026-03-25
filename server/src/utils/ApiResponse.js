/**
 * Sends a standardised JSON success response.
 *
 * Shape: { success: true, message, data }
 *
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {*}      [data]
 */
const ApiResponse = (res, statusCode, message, data = null) => {
    const body = { success: true, message };
    if (data !== null) body.data = data;
    return res.status(statusCode).json(body);
};

module.exports = ApiResponse;
