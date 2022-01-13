import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
// import logger from 'morgan';
import config from './config';
import { saveLog, logRegRes } from './lib/ControlCenter';
import router from './router/router';
// var winston = require('../config/winston');
// import logger from "../config/logger.js";
import logger from "../config/logger";



const app = express();
app.use(logger);
// app.use(logger('[:date[clf]] ":method :url HTTP/:http-version" :url :status :res[content-length] - :response-time ms'));
// app.use(logger('combined', {stream: winston.stream}));
// const { port } = config;
app.set('port', process.env.PORT || config.port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);




export default app;

