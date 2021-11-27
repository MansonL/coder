import e, { Application, Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import store from 'session-file-store'
import { Server } from 'http';
import session from 'express-session';

const PORT = 8080;
const fileStore = store(session);

const app = e();
app.use(cookieParser());
app.use(e.json());
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store : new fileStore({
        path: '../sessions',
        ttl: 300,
        retries: 0
    }),
    cookie: {
        maxAge: 1000*60
    }
}))
const server = new Server(app);
server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`))
app.get('/set-cookie', (req: Request, res: Response) => {
    console.log(req.session)
    res.send({process: "Successful", message: "Cookie created!"});
});

app.get('/get-cookies', (req: Request, res:Response) => {
    res.send(req.cookies)
});