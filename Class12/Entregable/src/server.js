import express from 'express';
import path from 'path';
import router from './routes/routes.js';
import handlebars from 'express-handlebars';


/*-------------  INITIALIZING SERVER & APP  -----------------*/
const PORT = 8080;
const APP = express();
const publicPath = path.resolve(__dirname, './public')

APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

/*-------------  SERVER LISTENING PORT & ERRORS  -----------*/
const http = require('http').Server(APP);

http.listen(PORT, () => {

    console.log(`Hi! This server is hosted at PORT: ${http.address().port}`);
});
http.on('error', error => {
    console.log(`Error: ${error}`)
});

APP.use('/api', router);
APP.use(express.static(publicPath));

/*--------------- HBS TEMPLATE ENGINE CONFIGURATION  --------*/

APP.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}));

APP.set('views', './src/views');
APP.set('view engine', 'hbs');

APP.get('/products/view', (req, res) => {
    res.render('form', {
        errorExist: false, messageExist: false,
        action: "http://localhost:8080/api/products/save",
        method: "post"
    });
})

/* ------------------ SOCKET IMPLEMENTATION ----------------------- */

const io = require('socket.io')(http);
const test = require('./class.js');


io.on('connection', socket => {
    console.log('New client connected!');
    socket.emit()
});

APP.get('/socket/form', (req,res) => {
    const result = await test.getProducts();
    result.length > 0
    ? res.render("form", { 
        errorExists: false, 
        productsExist: true,
        items: true,
        products: result,
      })
    : res.render("form", {
        errorExists: true,
        productsExist: false,
        message: result.error,
      });
    
});


  