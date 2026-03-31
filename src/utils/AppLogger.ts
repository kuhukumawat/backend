import winston, { createLogger } from "winston";

export const AppLogger = createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - [${level.toUpperCase()}] - ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/comined.log" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});
