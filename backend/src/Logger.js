const winston = require("winston");

// LOGGER CONFIGURATION
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";
const Logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: timestampFormat }),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = Logger;
