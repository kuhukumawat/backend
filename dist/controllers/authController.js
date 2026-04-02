"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendCode = exports.verifyMail = exports.refreshTokenHandler = exports.forgortPassword = exports.loginUser = exports.registerUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const authService_1 = require("../services/authService");
const apiError_1 = __importDefault(require("../utils/apiError"));
const token_1 = require("../utils/token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateCode_1 = require("../utils/generateCode");
const sendMail_1 = require("../utils/sendMail");
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
        otp: "",
        otpExpiry: new Date(),
        isVerified: false,
        verificationToken: "",
    });
    const verificationCode = (0, generateCode_1.generateCode)();
    user.otp = verificationCode;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await (0, sendMail_1.sendEmail)(user.email, "Verify your email", `Your verification code is ${verificationCode}`);
    res.status(201).json({
        success: true,
        message: "User registered successfully please verify your email first for login",
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
    if (!user.user.isVerified) {
        return next(new apiError_1.default(400, "Please verify your email first"));
    }
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
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
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
const verifyMail = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new apiError_1.default(404, "User not found");
    }
    if (user.isVerified) {
        throw new apiError_1.default(400, "User already verified");
    }
    if (!user.otp || user.otp.toUpperCase() !== otp.toUpperCase()) {
        throw new apiError_1.default(400, "Invalid code");
    }
    if (user.otpExpiry && user.otpExpiry < new Date()) {
        throw new apiError_1.default(400, "Code expired");
    }
    user.isVerified = true;
    user.otp = "";
    user.otpExpiry = new Date();
    await user.save();
    res.json({
        success: true,
        message: "Email verified successfully",
    });
};
exports.verifyMail = verifyMail;
const resendCode = async (req, res) => {
    const { email } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new apiError_1.default(404, "User not found");
    }
    if (user.isVerified) {
        throw new apiError_1.default(400, "User already verified");
    }
    const verificationCode = (0, generateCode_1.generateCode)();
    user.otp = verificationCode;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    await (0, sendMail_1.sendEmail)(user.email, "Verify your email", `Your verification code is ${verificationCode}`);
    res.json({
        success: true,
        message: "Code resent successfully",
    });
};
exports.resendCode = resendCode;
//# sourceMappingURL=authController.js.map