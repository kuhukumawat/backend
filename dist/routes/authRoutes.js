"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validator_1 = require("../middleware/validator");
const asyncHandler_1 = require("../middleware/asyncHandler");
const authValidator_1 = __importDefault(require("../validators/authValidator"));
const router = express_1.default.Router();
// Auth routes
router.post("/register", (0, validator_1.validate)(authValidator_1.default), (0, asyncHandler_1.asyncHandler)(authController_1.registerUser));
router.post("/login", (0, validator_1.validate)(authValidator_1.default), (0, asyncHandler_1.asyncHandler)(authController_1.loginUser));
router.post("/refresh-token", (0, asyncHandler_1.asyncHandler)(authController_1.refreshTokenHandler));
router.post("/forgot-password", (0, validator_1.validate)(authValidator_1.default), (0, asyncHandler_1.asyncHandler)(authController_1.forgortPassword));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map