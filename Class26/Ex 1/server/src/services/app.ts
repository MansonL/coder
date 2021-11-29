import e, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import { router } from '../routes/routes';
import passport from '../utils/passport'

export const app : Application = e();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 1000*60*10 // ten minutes before cookie expiration
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response) => {
    /*
    console.log('------------------------- REQ SESSION --------------------------------');
    console.log(JSON.stringify(req.session));
    console.log('------------------------- REQ USER -----------------------------------');
    console.log(JSON.stringify(req.user))
    */
})

app.use('/api', router);