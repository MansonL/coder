import express from 'express';
import { Postman } from './class.js';
const PORT = 8080;
const APP = express();
const test = new Postman();
test.addProduct('Roast Beef', 8.99,'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/327DBA15-0C31-4CC6-ABCA-2FCE38AF66CD/Derivates/edb1c351-ed50-4560-a2d1-bf3e0be1a04d.jpg');
test.addProduct('Milk',1.29, 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431.jpg' );
test.addProduct('Beans', 0.99, 'https://static.independent.co.uk/2021/01/04/09/iStock-969582980.jpg?width=982&height=726&auto=webp&quality=75');

APP.use(express.json());
APP.use(express.urlencoded({extended:true}));
const SERVER = APP.listen(PORT, () => {
    console.log(`Hi! This server is hosted at PORT: ${SERVER.address().port}`);
});
SERVER.on('error', error => {
    console.log(`Error: ${error}`)
});
APP.get('/api/', (req,res) => {
    res.json(`You can access the followings addresses:
    '/api/products/list',
    '/api/products/list/id',
    '/api/products/save/' (to save a product)`)
})
APP.get('/api/products/list', (req,res) => {
     res.json(test.getProducts());
});
APP.get('/api/products/list/:id', async (req,res) => {
   let idx = req.params.id;
   let products = await test.getOne(idx);
   res.json(products);
});
APP.post('/api/products/save', async (req,res) => {
    const {title, price, thumbnail} = req.body;
    await test.addProduct(title,Number(price),thumbnail);
    let data = await test.getOne(test.products.length - 1);
    res.json(data)
});

