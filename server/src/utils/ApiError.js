/**
 * Custom error class for API errors.
 * Contains a statusCode so the global error handler can send the right HTTP status.
 */
class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code (e.g. 400, 401, 404, 409, 500)
     * @param {string} message    - Human-readable error message returned to the client
     */
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
    }
}

module.exports = ApiError;
