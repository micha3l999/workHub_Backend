const winston = require("winston");

const tsFormat = () => new Date().toLocaleTimeString();

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(tsFormat),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

global.logger = Logger;

module.exports = Logger;
