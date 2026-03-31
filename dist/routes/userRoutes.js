"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = __importStar(require("../middleware/auth"));
const validator_1 = require("../middleware/validator");
const uploads_1 = require("../utils/uploads");
const userValidator_1 = __importStar(require("../validators/userValidator"));
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = express_1.default.Router();
router.post("/search", auth_1.default, (0, auth_1.authorize)(["admin"]), (0, asyncHandler_1.asyncHandler)(userController_1.getAllUsers));
router.post("/create-user", auth_1.default, (0, auth_1.authorize)(["admin"]), uploads_1.upload.single("profileImage"), (0, validator_1.validate)(userValidator_1.default), (0, asyncHandler_1.asyncHandler)(userController_1.createUser));
router.post("/update-user", auth_1.default, (0, auth_1.authorize)(["admin"]), uploads_1.upload.single("profileImage"), (0, validator_1.validate)(userValidator_1.default), (0, asyncHandler_1.asyncHandler)(userController_1.updateUser));
router.delete("/delete-user", auth_1.default, (0, auth_1.authorize)(["admin"]), (0, validator_1.validate)(userValidator_1.deleteUserSchema), (0, asyncHandler_1.asyncHandler)(userController_1.deleteUser));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map