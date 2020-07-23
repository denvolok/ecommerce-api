import process from "process";
import winston from "winston";

const { createLogger, format, transports } = winston;

const consoleFormat = format.printf(
  ({ level, message, timestamp }) =>
    `${level}${level.includes("info") ? " " : ""} [${timestamp}] :: ${message}`
);

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [],
});

if (process.env.NODE_ENV !== "production") {
  logger.level = "debug";
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), consoleFormat),
    })
  );
}

export default logger;
