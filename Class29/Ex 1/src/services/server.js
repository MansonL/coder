import express from 'express';


const app = express();


app.get('/', (req, res) => {
    res.json({
        message: "Hi, I'm a worker!",
        pid: process.pid
    });
});

app.get('/slow', (req, res) => {
    console.log(`Slow endpoint`);
    let sum = 0;
    for (let  i= 0; i < 5e9; i++){
        sum+=i;
    }
    res.json({
        process: process.pid,
        result: sum
    })
})

app.get('/die', (req,res) => {
    console.log(`Worker ${process.pid} died.`);
    process.exit(0);
})



export default app;