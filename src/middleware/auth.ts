import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/user.types";
import ApiError from "../utils/apiError";
import User from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("authorization");
  try {
    if (!token) {
      return next(new ApiError(401, "No token provided"));
    }
    const authToken = token.split(" ")[1];
    if (!authToken) {
      return next(new ApiError(401, "Invalid token format"));
    }

    const secret = process.env.ACCESS_TOKEN_SECRET || "";
    const decoded = jwt.verify(
      authToken,
      secret,
    ) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    (req as AuthRequest).user = user as unknown as IUser;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(new ApiError(500, error.message));
    }

    return next(new ApiError(500, "Something went wrong"));
  }
};

export default authMiddleware;

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthRequest).user;
    if (!user) {
      return next(new ApiError(401, "No token provided"));
    }
    if (!roles.includes(user.role)) {
      return next(
        new ApiError(403, "Access Denied: You do not have permission to access this data"),
      );
    }
    next();
  };
};
