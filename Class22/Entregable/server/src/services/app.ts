import express from 'express';
import cors from 'cors';
import { router } from '../routes';
import { errorHandler } from '../utils/errorHandler';
import { unknownRoute } from '../utils/unknownRoute';
import { mongoConnection } from '../models/DAOs/Mongo/connection';

export const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoConnection().then((msg) => console.log(msg));
app.use('/', router);
app.use(errorHandler);
app.use(unknownRoute);
