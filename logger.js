const winston = require("winston");

const tsFormat = () => new Date().toLocaleTimeString();

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: "error",
      filename: 'logs/errors.log',
  })
  ],
});

global.logger = Logger;

module.exports = Logger;
