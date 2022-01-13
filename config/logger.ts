// var winston = require('winston');
// const expressWinston = require('express-winston');
// const config = require('../src/config');
// require('winston-mongodb');

import winston from 'winston';
import expressWinston from 'express-winston';
import config from '../src/config';
import 'winston-mongodb';

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const requestLog = expressWinston.logger({
  format: winston.format.combine(
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.json({
        space: 2
      })
    }),
    new winston.transports.MongoDB({
      db: config.mongoURI,
      collection: "log",
      options: {
        useNewUrlParser: true,
        poolSize: 2,
        autoReconnect: true
      },
    })
  ],
  meta: true,
  // msg: "Request: {{req.method}} {{req.url}}; {{res.responseTime}}ms; ipAddress {{req.connection.remoteAddress}}",
  msg: "{{req.url}}",
  requestWhitelist: [
    "url",
    "method",
    // "headers",
    // "httpVersion",
    // "originalUrl",
    "query",
    "body"
  ],
});

// module.exports = requestLog;
export default requestLog;