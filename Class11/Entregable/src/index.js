import express from 'express';
import path from 'path';
import routerPostman from './routes/routes.js';

/*-------------  INITIALIZING SERVER & APP  -----------------*/
const PORT = 8080;
const APP = express();
const publicPath = path.resolve(__dirname, './public')

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

/*-------------  SERVER LISTENING PORT & ERRORS  -----------*/

const SERVER = APP.listen(PORT, () => {

    console.log(`Hi! This server is hosted at PORT: ${SERVER.address().port}`);
});
SERVER.on('error', error => {
    console.log(`Error: ${error}`)
});

APP.use('/api', routerPostman);
APP.use(express.static(publicPath));

/*--------------- EJS TEMPLATE ENGINE CONFIGURATION  --------*/


APP.set('views', './src/views');
APP.set('view engine', 'ejs');

APP.get('/products/view', (req, res) => {
    res.render('form', {
        errorExist: false, messageExist: false, update: false,
        action: "http://localhost:8080/api/products/save",
        method: "post"
    });
})
