const { decodeToken } = require("../utils/jwt.js");
const userModel = require("../models/user.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");

/**
 * Extracts the JWT from either the cookie or the Authorization header.
 * Returns null if no token is found.
 */
const extractToken = (req) => {
    if (req.cookies?.token) return req.cookies.token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};

/**
 * Middleware: allows any authenticated user (user OR admin).
 */
const userAuth = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);
    if (!token) throw new ApiError(401, "Unauthorized");

    const decodedToken = decodeToken(token);
    const user = await userModel.findById(decodedToken.id);
    if (!user) throw new ApiError(401, "Unauthorized");

    req.user = user;
    next();
});

/**
 * Middleware: allows only admin users.
 */
const adminAuth = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);
    if (!token) throw new ApiError(401, "Unauthorized");

    const decodedToken = decodeToken(token);
    const user = await userModel.findById(decodedToken.id);
    if (!user) throw new ApiError(401, "Unauthorized");
    if (user.role !== "admin") throw new ApiError(403, "Forbidden: Admins only");

    req.user = user;
    next();
});

module.exports = { userAuth, adminAuth };