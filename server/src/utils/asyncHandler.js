/**
 * Wraps an async route handler and forwards any thrown error to Express's next(err).
 * Eliminates the need for try/catch in every controller function.
 *
 * @param {Function} fn - async (req, res, next) handler
 */
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
