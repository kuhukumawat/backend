"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware = async (req, res, next) => {
    const token = req.header("authorization");
    try {
        if (!token) {
            return next(new apiError_1.default(401, "No token provided"));
        }
        const authToken = token.split(" ")[1];
        if (!authToken) {
            return next(new apiError_1.default(401, "Invalid token format"));
        }
        const secret = process.env.ACCESS_TOKEN_SECRET || "";
        const decoded = jsonwebtoken_1.default.verify(authToken, secret);
        const user = await User_1.default.findById(decoded.userId);
        if (!user) {
            return next(new apiError_1.default(401, "User not found"));
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return next(new apiError_1.default(500, error.message));
        }
        return next(new apiError_1.default(500, "Something went wrong"));
    }
};
exports.default = authMiddleware;
const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return next(new apiError_1.default(401, "No token provided"));
        }
        if (!roles.includes(user.role)) {
            return next(new apiError_1.default(403, "Access Denied: You do not have permission to access this data"));
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map