import express from 'express';
import router_products from './routes_products';
import router_cart from './routes_cart';

const router = express.Router();

router.use('/products', router_products);
router.use('/cart', router_cart);

export default router;
