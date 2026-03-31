import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import ApiError from "../utils/apiError";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ApiError(400, "Invalid data"));
    }

    req.body = result.data;
    next();
  };
};
