"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "No token provided" });
        }
        const authToken = token.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(authToken, "secretKey");
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
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
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map