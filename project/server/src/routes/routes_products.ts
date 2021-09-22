import express, { Router } from 'express';
import { p_controller } from '../controllers/products';
import checkAdmin from '../middleware/isAdmin';

const router_products: Router = express.Router();

/* ------------------------ ROUTES ---------------------------- */

router_products.get('/list', checkAdmin, p_controller.getAll);

router_products.get('/list/?:id', checkAdmin, p_controller.getOne);

router_products.get('/query', checkAdmin, p_controller.query);

router_products.put('/update/?:id', checkAdmin, p_controller.updateProduct);

router_products.post('/save', checkAdmin, p_controller.saveProduct);

router_products.delete('/delete/:id', checkAdmin, p_controller.deleteProduct);

/* --------------------------- EXPORT ------------------------------- */

export default router_products;
