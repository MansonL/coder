import e, { Application } from 'express';
import { Server } from 'http';
import session from 'express-session';

const PORT  = 8080;
const app : Application = e();
const server = new Server(app);

server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));

app.use(session({
    secret: 'sessions-test',
    resave: true,
    saveUninitialized: true,
}));
