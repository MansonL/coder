import express, { Router } from "express";
import { getProduct, getCart, addToCart, deleteFromCart } from "../controllers/cart";

const router_cart : Router = express.Router();

/* --------------------- ROUTES ---------------------------------- */ 

router_cart.get('/list', getCart);
router_cart.get('/list/:id', getProduct);
router_cart.post('/add/:id', addToCart);
router_cart.delete('/delete/:id', deleteFromCart)

/* --------------------------- EXPORT ------------------------------- */

export default router_cart