const { format, transports, createLogger } = require("winston");

const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: "debug",
    format: combine(label({ label: process.env.APP_NAME }), timestamp(), customFormat),
    transports: [new transports.Console({ colorize: true })],
});

module.exports = { logger, customFormat, combine, timestamp, label };