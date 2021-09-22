import express, { Router } from 'express';
import { c_controller } from '../controllers/cart';

const router_cart: Router = express.Router();

/* --------------------- ROUTES ---------------------------------- */

router_cart.get('/list', c_controller.getCart);
router_cart.get('/list/:id', c_controller.getProduct);
router_cart.post('/add/:id', c_controller.addToCart);
router_cart.delete('/delete/:id', c_controller.deleteFromCart);

/* --------------------------- EXPORT ------------------------------- */

export default router_cart;
