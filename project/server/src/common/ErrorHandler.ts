import { ErrorRequestHandler } from 'express';
import { ApiError } from './ApiError';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`Inside error handler.`);
    if (error instanceof ApiError) {
        res.status(error.error).send(error.message);
    } else {
        res.status(500).send(`Something went wrong.`);
    }
};
