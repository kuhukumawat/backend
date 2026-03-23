import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    const authToken = token.split(" ")[1];
    if (!authToken) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format" });
    }
    const decoded = jwt.verify(authToken, "secretKey");
    req.user = decoded;
    next();
  } catch (error: unknown) {
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

export default authMiddleware;
