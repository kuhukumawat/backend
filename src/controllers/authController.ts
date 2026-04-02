import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import {
  forgotPasswordService,
  loginService,
  registerUserService,
} from "../services/authService";
import ApiError from "../utils/apiError";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateCode } from "../utils/generateCode";
import { sendEmail } from "../utils/sendMail";
dotenv.config();

const getVerificationEmailTemplate = (verificationCode: string) => `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    
    <h2 style="color: #333;">Verify Your Email</h2>
    
    <p style="font-size: 16px; color: #555;">
      Thank you for registering. Please use the verification code below:
    </p>

    <div style="
      margin: 20px auto;
      padding: 15px 25px;
      background-color: #f4f4f4;
      display: inline-block;
      border-radius: 8px;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 5px;
      color: #000;
    ">
      \${verificationCode}
    </div>

    <p style="font-size: 14px; color: #888;">
      ⏳ This code will expire in <b>10 minutes</b>.
    </p>

    <p style="font-size: 14px; color: #888;">
      If you did not request this, please ignore this email.
    </p>

  </div>
`;

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, age, gender } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }
  const user = await registerUserService({
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
  const verificationCode = generateCode();
  user.otp = verificationCode;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail(
    user.email,
    "Verify your email",
    `Your verification code is ${verificationCode}`,
    getVerificationEmailTemplate(verificationCode),
  );
  res.status(201).json({
    success: true,
    message:
      "User registered successfully please verify your email first for login",
    data: user,
  });
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(400, "Email or Password is wrong"));
  }
  const user = await loginService({ email, password });
  if (!user.user.isVerified) {
    return next(new ApiError(400, "Please verify your email first"));
  }
  res.send({
    success: true,
    message: "User logged in successfully",
    data: user,
  });
};
export const forgortPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError(400, "Email or Password is required"));
  }
  const user = await forgotPasswordService({
    email: email,
    password: password,
  });
  res.send({
    success: true,
    message: "Password reset successfully",
  });
};
export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.body.token;
  if (!token) {
    return next(new ApiError(401, "Refresh token not found"));
  }
  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
    userId: string;
  };

  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return next(new ApiError(401, "User not found"));
  }
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());
  res.send({
    success: true,
    message: "Refresh token generated successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
};
export const verifyMail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isVerified) {
    throw new ApiError(400, "User already verified");
  }

  if (!user.otp || user.otp.toUpperCase() !== otp.toUpperCase()) {
    throw new ApiError(400, "Invalid code");
  }

  if (user.otpExpiry && user.otpExpiry < new Date()) {
    throw new ApiError(400, "Code expired");
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
export const resendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (user.isVerified) {
    throw new ApiError(400, "User already verified");
  }
  const verificationCode = generateCode();
  user.otp = verificationCode;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  const htmlTemplate = getVerificationEmailTemplate(verificationCode);
  await sendEmail(
    user.email,
    "Verify your email",
    `Your verification code is ${verificationCode}`,
    htmlTemplate,
  );
  res.json({
    success: true,
    message: "Code resent successfully",
  });
};
