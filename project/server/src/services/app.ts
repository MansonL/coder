import router from '../routes/index';
import cors from 'cors';
import unknownRoute from '../utils/routeUndefined';
import { errorHandler } from '../common/ErrorHandler';
import express from 'express';

export const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);
app.use(unknownRoute);
app.use(errorHandler);
