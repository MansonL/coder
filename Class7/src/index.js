import express from 'express';
import fs from 'fs';
const path = './products.txt'
let data = JSON.parse(fs.readFileSync(path))
let amount = data.length    
let first = 0, second = 0;
const PORT = 8080;
const app = express();
const server = app.listen(PORT, () => {
    console.log(`Server hosted at PORT: ${server.address().port}`);
});

server.on('error', error => {
    console.log(`Server error: ${error}`);
});


app.get('/items',(req,res) => {
    first++;
    res.json({items:data, amount:amount });
})

app.get('/item-random', (req,res)=>{
    second++;
    const random = Math.floor((Math.random() * amount + 1) - 1);
    res.json({item: data[random]});
});

app.get('/visitas', (req,res) => {
  res.json({visits : {items: first, item: second}})
})
