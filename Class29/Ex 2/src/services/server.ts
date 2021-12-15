import e, { Application, Request, Response } from 'express';

const app : Application = e();

process.on("message", (port: number) => {
    app.listen(port, () => {
        console.log(`Process ${process.pid} hosting server at port ${port}`);
    });

    app.get("/", (req: Request, res: Response) => {
        res.send(`Process ${process.pid}`);
    })
})