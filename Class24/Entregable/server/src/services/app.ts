import express from 'express';
import cors from 'cors';
import { router } from '../routes';
import { errorHandler } from '../utils/errorHandler';
import { unknownRoute } from '../utils/unknownRoute';
import { mongoConnection } from '../models/DAOs/Mongo/connection';
import session from 'express-session'
import MongoStore from 'connect-mongo'

export const app: express.Application = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        clientPromise: mongoConnection(),
        stringify: false,
        autoRemove: 'interval',
        autoRemoveInterval: 1,
    }),
    cookie: {
        maxAge: 1000 * 60,
        httpOnly: true,
    }
}));
app.use('/', router);
app.use(errorHandler);
app.use(unknownRoute);

