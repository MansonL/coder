import express from 'express';
import Postman from '../class';

const router = express.Router();

const test = new Postman();

test.addUpdateProduct('Roast Beef', 8.99,'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/327DBA15-0C31-4CC6-ABCA-2FCE38AF66CD/Derivates/edb1c351-ed50-4560-a2d1-bf3e0be1a04d.jpg','save');
test.addUpdateProduct('Milk',1.29, 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431.jpg','save' );
test.addUpdateProduct('Beans', 0.99, 'https://static.independent.co.uk/2021/01/04/09/iStock-969582980.jpg?width=982&height=726&auto=webp&quality=75','save');


const saveUpdateVal = async (title,price,thumbnail,id = null) => {
    if(title !== '' && price !== '' && thumbnail !== ''){
        return await test.addUpdateProduct(title,price,thumbnail,'save',id);
    }else{
        return new Error(`Please set the product properties correctly...`);
    }
} 

router.get('/',(req,res) => {
    res.json(`You can access the followings addresses:
    '/api/products/list',
    '/api/products/list/id',
    '/api/products/save/' (to save a product)'`)
});
router.get('/products', (req,res) => {
       res.json(`Go to one of the followings addresses:
       '/api/products/list',
       '/api/products/list/id',
       '/api/products/save/' (to save a product)',
       '/api/products/update/id',
       '/api/products/delete/id'`)
});
router.get('/products/list',async (req,res) => {
    let products = await test.getProducts();
    res.render('table',{products:products}) // Here we are going to render table.hbs
});
router.get('/products/list/:id', async (req,res) => {
    let id = req.params.id;
    let products = await test.getOne(id);
    res.json(products); // Here we are going to render table.hbs

});
router.post('/products/save',async (req,res) => {
    const {title,price,thumbnail} = req.body;
    const result = await saveUpdateVal(title,price,thumbnail);
    const err = /[Error:]/gi;
    console.log(result);
    err.test(result) ? res.render('form',{message: `${result}`, errorExist: true, messageExist: false}) : res.render('form', {message: `${result}`, errorExist: false,messageExist: true}); 
    
});
router.get('/products/save', async (req,res) => {
    res.render('form', {errorExist:false,messageExist:false});
})
router.put('/products/update/:id', async(req,res) => {
    const {title,price,thumbnail} = req.body;
    const id = req.params.id;
    const result =  await saveUpdateVal(title,price,thumbnail,id);
    const err = /[Error:]/gi;
    console.log(result)
    err.test(result) ? res.render('form',{message: `${result}`,errorExist: true,messageExist:false}) : res.render('form',{message: `${result}`, errorExist: false, messageExist: true});
});
router.delete('/products/delete/:id',async (req,res) => {
     let id = req.params.id;
     let deleted = await test.delete(id);
     deleted === undefined ? res.json(`Couldn't delete the product, check the id of the product you're interested in...`) : res.json(`Product deleted: ${JSON.stringify(deleted)}`);
});
export default router