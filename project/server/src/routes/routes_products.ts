import express, { Router } from 'express';
import { product_controller } from '../controllers/products';
import checkAdmin from '../middleware/isAdmin';

const router_products: Router = express.Router();

/* ------------------------ ROUTES ---------------------------- */

router_products.get('/list', checkAdmin, product_controller.getAll);

router_products.get('/list/?:id', checkAdmin, product_controller.getOne);

router_products.get('/query', checkAdmin, product_controller.query);

router_products.put(
    '/update/?:id',
    checkAdmin,
    product_controller.updateProduct
);

router_products.post('/save', checkAdmin, product_controller.saveProduct);

router_products.delete(
    '/delete/:id',
    checkAdmin,
    product_controller.deleteProduct
);

/* --------------------------- EXPORT ------------------------------- */

export default router_products;
