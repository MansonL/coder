import e, { Application, Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import { Server } from 'http';

const PORT = 8080;

const app = e();
app.use(e.json());
app.use(cookieParser());
const server = new Server(app);
server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`))
app.get('/set-cookie', (req: Request, res: Response) => {
    const { name, value, expiration } = req.query;
    if(!name || !value){
        res.status(400).send({error: 'set-cookie: cookie name or value missing...'})
    }else{
        if(expiration){
            res.cookie(name as string, value, {maxAge: Number(expiration)}).send({process: `Ok. Cookie ${name} with value ${value} created and will expired in ${expiration} seconds.`});
        }else{
            res.cookie(name as string, value).send({process: `Ok. Cookie ${name} with value ${value} created with no expiration time.`});
        }
    }
});

app.get('/clear-cookie', (req: Request, res:Response) => {
    const { name } = req.query;
    if(!name){
        res.status(400).send({error: 'clear-cookie: cookie name missing...'})
    }else{
        res.clearCookie(name as string).send({message: `cookie ${name} cleared.`})
    }
})

app.get('/get-cookies', (req: Request, res:Response) => {
    res.send(req.cookies)
});