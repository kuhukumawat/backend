import { Request, Response, NextFunction } from "express";
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Logger working");
  next();
};

export default logger;
