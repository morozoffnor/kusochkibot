const winston = require("winston");

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // adds a timestamp property
    winston.format.json(),
    winston.format.errors({ stack: true }),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "error.log", level: "warn" }),
      new winston.transports.File({ filename: "app.log" })
  ],
  handleExceptions: true
});