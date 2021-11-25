import express from 'express';
import cors from 'cors';
import { router } from '../routes';
import { errorHandler } from '../utils/errorHandler';
import { unknownRoute } from '../utils/unknownRoute';
import { mongoConnection } from '../models/DAOs/Mongo/connection';
import session from 'express-session'
import mongoStore from 'connect-mongo'

export const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        client: mongoConnection(),
        stringify: false,
        autoRemove: 'interval',
        autoRemoveInterval: 1,
    }),
    cookie: {
        maxAge: 1000 * 60,
        httpOnly: false,
    }
}));
app.use('/', router);
app.use(errorHandler);
app.use(unknownRoute);

