import { fork } from "child_process";
import express, { Application, Request, Response } from "express";
import { createServer, Server } from "http";

const PORT = 8080;

const app : Application = express();
const server : Server = createServer(app);

let visits = 0;
const blockingFunction = () => {
    let addition = 0;
    for (let i = 0; i < 5e9; i++) {
        addition+=i;
    }
  return addition
}

server.listen(PORT, () => console.log(`Server hosted at port: ${PORT}`));

app.get('/', (req: Request, res: Response) => {
    visits++;
    res.json({
        visitsCount: visits,
    });
});

app.get('/block-count', (req: Request, res: Response) => {
    const result = blockingFunction();
    res.json({
        result: result
    })   
})

app.get('/non-block-count', (req: Request, res: Response) => {
    const child = fork('./src/non-blocking-function.ts');
    console.log(child);
    child.on("exit", (result: number) => {
        res.json({
            result: result
        })
    })
})
