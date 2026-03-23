"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = async (req, res) => {
    try {
        const { name, email, password, age, gender } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
        });
        await user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, "secretKey", { expiresIn: "48h" });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
            token: token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = new User_1.default(req.body);
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email or Password is wrong",
        });
    }
    const matchUser = await User_1.default.findOne({ email });
    if (!matchUser) {
        return res.json({ message: "User not found" });
    }
    const isMatch = await bcryptjs_1.default.compare(password, matchUser.password);
    if (!isMatch) {
        return res.json({ message: "Invalid password" });
    }
    const token = jsonwebtoken_1.default.sign({ id: matchUser._id }, "secretKey", {
        expiresIn: "48h",
    });
    res.json({
        success: true,
        message: "User Logged In",
        data: { matchUser },
        token: token,
    });
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map