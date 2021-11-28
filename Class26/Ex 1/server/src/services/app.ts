import e, { Application } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { Strategy } from 'passport-local'
import { router } from '../routes/routes';
import { passportSignup, passportLogin, doneFunction } from '../utils/passportFunctions';
import { IUser, usersStore } from '../store/store';


export const app : Application = e();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
}));

app.use(cookieParser());

app.use(session({
    secret: 'assignment bro',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 1000*60*10 // ten minutes before cookie expiration
    },
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new Strategy({
    passReqToCallback: true
}, passportLogin));

passport.use('signup', new Strategy({
    passReqToCallback: true
}, passportSignup));

passport.serializeUser((user: IUser, done: (err: any, id?: string) => void) => {
    done(null, user._id)
});

passport.deserializeUser((id: string, done: (err: any, user: IUser | undefined | false | null) => void) => {
    usersStore.findByID(id, (err, user) => {
        done(err,user)
    })
})

app.use(router);