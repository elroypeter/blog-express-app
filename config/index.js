const { transports } = require('winston');
const expressWinston = require('express-winston');
const { customFormat, combine, timestamp, label } = require('./logger');

module.exports = (app) => {
    app.use(expressWinston.logger({
        transports: [new transports.Console({ colorize: true })],
        format: combine(label({ label: process.env.APP_NAME }), timestamp(), customFormat),
        meta: false,
        expressFormat: true,
        colorize: true,
        ignoreRoute: function (req, res) { return false; }
    }));
}