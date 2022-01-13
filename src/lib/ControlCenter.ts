import ajv from 'ajv';
import { Request, Response, NextFunction } from 'express';
import winston, { exceptions } from 'winston';
import expressWinston from 'express-winston';

import SchemaValidationException from './exceptions/SchemaValidationExecption';
import UnauthorizedException from './exceptions/UnauthorizedException';
import ConflictException from './exceptions/ConflictException';
import NotFoundException from './exceptions/NotFoundException';
import NotMatchException from './exceptions/NotMatchException';


const validateSchema = async (body: string, schema: object) => {
    const validator = new ajv().compile(schema);
    const validationResult = validator(body);

    if (!validationResult) {
        console.log(validator.errors);
        throw new SchemaValidationException("Schema Validation Error");
    }
};


export const checkRequest = async (request: Request, response: Response, schema: object, authenticationNeeded: boolean,
    permission: string, isAdmin: boolean, next: NextFunction): Promise<void | Response> => {
    try {
        await validateSchema(request.body, schema);

        if (authenticationNeeded) {
            // authorize
            // checkpermission
            // return next(user)
            return next();
        }
        return next();

    } catch (exception) {
        console.log(`exception: ${exception}`);
        if (exception instanceof UnauthorizedException) {
            return response.status(401).json({ success: false, message: exception.message, messageCode: exception.code });
        } else if (exception instanceof NotFoundException || exception instanceof NotMatchException) {
            return response.status(404).json({ success: false, message: exception.message, messageCode: exception.code });
        } else if (exception instanceof ConflictException) {
            return response.status(409).json({ success: false, message: exception.message, messageCode: exception.code });
        } else {
            return response.status(400).json({ success: false, message: exception.message, messageCode: exception.code });
        }
    }
};


export const saveLog = async (request: Request, response: Response, next: NextFunction) => {



    // console.log(request.body);
    // console.log(request.headers["x-forwarded-for"] || request.socket.remoteAddress);
    // console.log(request.method);
    // console.log(response.statusCode);
    // let body = {
    //     "request": request.body,
    //     "response": JSON.stringify(response),
    //     "route": request.originalUrl,
    //     "ip": request.headers["x-forwarded-for"] || request.socket.remoteAddress,
    //     "method": request.method,
    //     "statusCode": response.statusCode
    // };
    // console.log(body);
    // const log: ILog = LogController.createLog()
    next();
};

export const logRegRes = async (req, res, next) => {
    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks = [];

    res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString('utf8');

        console.log({
            time: new Date().toUTCString(),
            fromIP: req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress,
            method: req.method,
            originalUri: req.originalUrl,
            uri: req.url,
            requestData: req.body,
            responseData: body,
            referer: req.headers.referer || '',
            ua: req.headers['user-agent']
        });

        console.log(body);
        oldEnd.apply(res, restArgs);
    };

    next();
}



