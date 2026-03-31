import User from "../models/User";
import ApiError from "../utils/apiError";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { createUserService, UserData } from "./userService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUserService = async (userData: UserData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await createUserService({
    ...userData,
    password: hashedPassword,
  });
  return user;
};

export const loginService = async ({
  email,
  password,
}: Pick<UserData, "email" | "password">) => {
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    throw new ApiError(404, "User not found");
  }
  const matchedPassword = await bcrypt.compare(password, findUser.password);
  if (!matchedPassword) {
    throw new ApiError(401, "Invalid password");
  }
  const accessToken = generateAccessToken(findUser._id.toString());
  const refreshToken = generateRefreshToken(findUser._id.toString());
  return {
    user: findUser,
    accessToken,
    refreshToken,
  };
};
export const forgotPasswordService = async ({
  email,
  password,
}: Pick<UserData, "email" | "password">) => {
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    throw new ApiError(404, "User not found");
  }
  const newPassword = await bcrypt.hash(password, 10);
  findUser.password = newPassword;
  await findUser.save();
};
