import express, { Router } from 'express';
import {
  getAll,
  getOne,
  saveProduct,
  modifyProduct,
  wipeProduct,
} from '../controllers/products';
import checkAdmin from '../middleware/isAdmin';

const router_products: Router = express.Router();

/* ------------------------ ROUTES ---------------------------- */

router_products.get('/list', checkAdmin, getAll);

router_products.get('/list/:id', checkAdmin, getOne);

router_products.put('/update/:id', checkAdmin, modifyProduct);

router_products.post('/save', checkAdmin, saveProduct);

router_products.delete('/delete/:id', checkAdmin, wipeProduct);

/* --------------------------- EXPORT ------------------------------- */

export default router_products;
