const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const { hashPass, comparePass } = require("../utils/bcrypt");
const { genToken } = require("../utils/jwt");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// ─── Shared Helpers ────────────────────────────────────────────────────────────

/**
 * Throws an ApiError if express-validator found validation errors.
 */
const checkValidation = (req) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        throw new ApiError(400, result.array()[0].msg);
    }
};

/**
 * Sets the JWT as an httpOnly cookie on the response.
 */
const setAuthCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
};

// ─── Controllers ───────────────────────────────────────────────────────────────

/**
 * @desc Registers a new regular user. Checks for existing phone, hashes password, and issues JWT cookie.
 * @route POST /auth/signup
 */
const signup = asyncHandler(async (req, res) => {
    checkValidation(req);

    const { name, phone, email, password } = req.body;

    const alreadyExists = await userModel.findOne({ phone });
    if (alreadyExists) throw new ApiError(409, "User already exists");

    const hashedPassword = await hashPass(password);
    const userData = email
        ? { name, phone, email, password: hashedPassword }
        : { name, phone, password: hashedPassword };

    const newUser = await userModel.create(userData);
    const token = genToken(newUser._id, newUser.phone);
    setAuthCookie(res, token);

    return ApiResponse(res, 201, "User created successfully", { user: newUser });
});

/**
 * @desc Authenticates a regular user. Explicitly blocks admins from logging in via this user route.
 * @route POST /auth/login
 */
const login = asyncHandler(async (req, res) => {
    checkValidation(req);

    const { phone, password } = req.body;

    const user = await userModel.findOne({ phone });
    if (!user) throw new ApiError(404, "User not found");
    if (user.role === "admin") throw new ApiError(403, "Admin cannot login as user");

    const isPasswordValid = await comparePass(password, user.password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid password");

    const token = genToken(user._id, user.phone);
    setAuthCookie(res, token);

    return ApiResponse(res, 200, "User logged in successfully", { user });
});

/**
 * @desc Logs out the current user or admin by forcibly clearing the JWT cookie.
 * @route POST /auth/logout
 */
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token", { path: "/" });
    return ApiResponse(res, 200, "User logged out successfully");
});

/**
 * @desc Registers an administrator. Requires a unique, server-side valid 'secretKey'.
 * @route POST /auth/signup/admin
 */
const adminSignup = asyncHandler(async (req, res) => {
    checkValidation(req);

    const { name, phone, email, password } = req.body;

    const alreadyExists = await userModel.findOne({ phone });
    if (alreadyExists) throw new ApiError(409, "User already exists");

    const hashedPassword = await hashPass(password);
    const newUser = await userModel.create({
        name, phone, email, password: hashedPassword, role: "admin",
    });
    const token = genToken(newUser._id, newUser.phone);
    setAuthCookie(res, token);

    return ApiResponse(res, 201, "Admin created successfully", { user: newUser });
});

/**
 * @desc Authenticates an administrator. Blocks regular users from utilizing this route.
 * @route POST /auth/login/admin
 */
const adminLogin = asyncHandler(async (req, res) => {
    checkValidation(req);

    const { phone, password } = req.body;

    const user = await userModel.findOne({ phone });
    if (!user) throw new ApiError(404, "User not found");
    if (user.role !== "admin") throw new ApiError(403, "Admin login only");

    const isPasswordValid = await comparePass(password, user.password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid password");

    const token = genToken(user._id, user.phone);
    setAuthCookie(res, token);

    return ApiResponse(res, 200, "Admin logged in successfully", { user });
});

module.exports = { signup, logout, login, adminSignup, adminLogin };