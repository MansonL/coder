import e, { Application, Response } from 'express';
import { Server } from 'http';
import session, { SessionData } from 'express-session';

const PORT  = 8080;
const app : Application = e();
const server = new Server(app);

server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));

declare module 'express-session' {
    export interface SessionData {
        user: string | undefined;
        count: number | undefined;
    }
}

app.use(session({
    secret: 'sessions-test',
    resave: true,
    saveUninitialized: true,
}));

app.get('/root', (req: e.Request, res: e.Response ) => {
    const { user } = req.query;
    if(req.session && req.session.count){
        if(user) req.session.user = user as string;
        req.session.count++;
        res.send(`${req.session.user ? `Welcome ${req.session.user}. You have visited this route ${req.session.count}` : `You have visited this route ${req.session.count} times.`}`)
    }else{
        req.session.count = 1;
        if(user) req.session.user = user as string;
        res.send(`You're welcome.`);
    }
});

app.get('/forget', (req: e.Request, res: e.Response ) => {
    if(req.session && req.session.count){
        req.session.count = 0;
    }else{
        res.send({error: `You haven't visited the route '/root' yet, so you cannot use this route...`});
    }
});