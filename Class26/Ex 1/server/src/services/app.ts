import e, { Application } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { Strategy } from 'passport-local'
import { router } from '../routes/routes';
import { doneFunction, createHash, validPassword } from '../utils/passportFunctions';
import { INew_User, IUser, usersStore } from '../store/store';


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
}, function(req: e.Request, username: string, password: string, done: doneFunction){
    console.log(req.body)
    usersStore.findOne(username, (err, user) => {
        if(err) done(err, null);
        if(!user){
            console.log(`Wrong credentials.`);
            return done(null, false, { message: `Wrong credentials.` });
        }else{
            if(!validPassword(user, password)){
                console.log(`Wrong credentials`);
                return done(null, false, { message: "Wrong credentials." });
        }
            return done(null, user)
        }   
    })
}));

passport.use('signup', new Strategy({
    passReqToCallback: true
}, function(req: e.Request, username: string, password: string, done: doneFunction){
    const testFunction = () => {
        usersStore.findOne(username, (err, user) => {
        if(err){
            console.log(`Error at signup ` + err)
            return done(err)
        }
        if(user){
            console.log(`There's an existing user with the username ${username}`);
            return done(null, false, { message: `There's an existing user with the username ${username}` })
        }else{
            const newUser : INew_User = {
                timestamp: req.body.timestamp,
                username: username,
                password: createHash(password),
                name: req.body.name,
                surname: req.body.surname,
                avatar: req.body.avatar,
                age: req.body.age,
                alias: req.body.alias,
            };
            usersStore.saveOne(newUser, (err, user) => {
                if(err){
                    console.log(`Error at saving user ` + err);
                    done(err)
                }else{
                    done(null, user)
                }
                    
            })
        }
    })}
    process.nextTick(testFunction)
}))

passport.serializeUser((user: IUser, done: (err: any, id?: string) => void) => {
    done(null, user.username)
});

passport.deserializeUser((username: string, done: (err: any, user: IUser | undefined | false | null) => void) => {
    usersStore.findByID(username, (err, user) => {
        done(err,user)
    })
})

app.use(router);