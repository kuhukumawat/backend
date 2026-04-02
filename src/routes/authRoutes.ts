import express from "express";
import {
  registerUser,
  loginUser,
  forgortPassword,
  refreshTokenHandler,
  verifyMail,
  resendCode,
} from "../controllers/authController";
import { validate } from "../middleware/validator";
import { asyncHandler } from "../middleware/asyncHandler";
import authSchema from "../validators/authValidator";

const router = express.Router();

// Auth routes
router.post("/register", validate(authSchema), asyncHandler(registerUser));
router.post("/login", validate(authSchema), asyncHandler(loginUser));
router.post("/verify-email", asyncHandler(verifyMail));
router.post("/resend-code", asyncHandler(resendCode));
router.post("/refresh-token", asyncHandler(refreshTokenHandler));
router.post(
  "/forgot-password",
  validate(authSchema),
  asyncHandler(forgortPassword),
);
export default router;
