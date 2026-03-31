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
dotenv.config();
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
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
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
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as { userId: string };
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired refresh token"));
  }

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
