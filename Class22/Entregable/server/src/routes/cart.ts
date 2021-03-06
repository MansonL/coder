import express, { Router } from 'express';
import { cart_controller } from '../controller/cart';

export const cartRouter: Router = express.Router();

cartRouter.get('/list', cart_controller.getCart);
cartRouter.get('/list/:id', cart_controller.getProduct);
cartRouter.post('/add/:id', cart_controller.addToCart);
cartRouter.delete('/delete/:id', cart_controller.deleteFromCart);
