import e, { Application, Request, Response } from 'express';

const app : Application = e();

app.listen(8080, () => {
    console.log("Server hosted");
})

app.get("/", (req: Request, res: Response) => {
    res.send(`Process ${process.pid}`)
})