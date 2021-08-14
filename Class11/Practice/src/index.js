import express from 'express';
import routerEj from './routes/routes.js';

const APP = express();
const PORT = 8080;

/* --------------------- APP USE ----------------*/

APP.use(express.json());
APP.use(express.urlencoded({extended : true}));
APP.use('/', routerEj);

/* ------------------- APP SET -------------------*/

APP.set('views', './src/views');
APP.set('view engine', 'ejs');

/* --------------------- SERVER ----    -------------*/

const SERVER = APP.listen(PORT, () => {
    console.log(`Server hosted at PORT: ${SERVER.address().port}`)
});

SERVER.on('error', error => {
    console.error(error);
});



