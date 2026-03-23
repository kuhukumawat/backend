import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req: Request, res: Response) => {
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "48h",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      token: token,
    });
  } catch (error: unknown) {
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
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = new User(req.body);
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email or Password is wrong",
    });
  }
  const matchUser = await User.findOne({ email });
  if (!matchUser) {
    return res.json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, matchUser.password);
  if (!isMatch) {
    return res.json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: matchUser._id }, process.env.JWT_SECRET || "", {
    expiresIn: "48h",
  });
  res.json({
    success: true,
    message: "User Logged In",
    data: { matchUser },
    token: token,
  });
};
