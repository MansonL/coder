import express from 'express';
import path from 'path';
import routerPostman from './routes/routes.js';
/*  INITIALIZING SERVER AT PORT 8080     */
const PORT = 8080;
const APP = express();
const publicPath = path.resolve(__dirname,'./public')

APP.use(express.json());
APP.use(express.urlencoded({extended:true}));


const SERVER = APP.listen(PORT, () => {
   
    console.log(`Hi! This server is hosted at PORT: ${SERVER.address().port}`);
});
SERVER.on('error', error => {
    console.log(`Error: ${error}`)
});


APP.use('/api',routerPostman);
APP.use(express.static(publicPath));
