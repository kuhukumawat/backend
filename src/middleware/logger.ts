import { Request, Response, NextFunction } from "express";
import { AppLogger } from "../utils/AppLogger";
const logger = (req: Request, res: Response, next: NextFunction) => {
  AppLogger.info(`${req.method} ${req.url}`);
  next();
};

export default logger;
