"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenHandler = exports.forgortPassword = exports.loginUser = exports.registerUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const authService_1 = require("../services/authService");
const apiError_1 = __importDefault(require("../utils/apiError"));
const token_1 = require("../utils/token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const registerUser = async (req, res) => {
    const { name, email, password, age, gender } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required",
        });
    }
    const user = await (0, authService_1.registerUserService)({
        name,
        email,
        password,
        age,
        gender,
    });
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
    });
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new apiError_1.default(400, "Email or Password is wrong"));
    }
    const user = await (0, authService_1.loginService)({ email, password });
    res.send({
        success: true,
        message: "User logged in successfully",
        data: user,
    });
};
exports.loginUser = loginUser;
const forgortPassword = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new apiError_1.default(400, "Email or Password is required"));
    }
    const user = await (0, authService_1.forgotPasswordService)({
        email: email,
        password: password,
    });
    res.send({
        success: true,
        message: "Password reset successfully",
    });
};
exports.forgortPassword = forgortPassword;
const refreshTokenHandler = async (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return next(new apiError_1.default(401, "Refresh token not found"));
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        return next(new apiError_1.default(401, "Invalid or expired refresh token"));
    }
    const user = await User_1.default.findById(decodedToken.userId);
    if (!user) {
        return next(new apiError_1.default(401, "User not found"));
    }
    const accessToken = (0, token_1.generateAccessToken)(user._id.toString());
    const refreshToken = (0, token_1.generateRefreshToken)(user._id.toString());
    res.send({
        success: true,
        message: "Refresh token generated successfully",
        data: {
            accessToken,
            refreshToken,
        },
    });
};
exports.refreshTokenHandler = refreshTokenHandler;
//# sourceMappingURL=authController.js.map