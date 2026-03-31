import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(new ApiError(400, "No file uploaded"));
  }
  res.json({
    success: true,
    message: "File uploaded successfully",
    data: req.file,
  });
};
export const uploadMultiple = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.files) {
    return next(new ApiError(400, "No file uploaded"));
  }
  res.json({
    success: true,
    message: "Files uploaded successfully",
    data: req.files,
  });
};
export const uploadToCloud = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return next(new ApiError(400, "No file uploaded"));
  }
  res.json({
    success: true,
    message: "File uploaded successfully",
    data: req.file,
  });
};
