import e, { Router } from 'express';
import { productsRouter } from './products';
import { messagesRouter } from './messages1';
import { usersRouter } from './users';
import { cartRouter } from './cart';
import { authRouter } from '../middleware/auth';

export const router: e.Router = Router();
router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/messages', messagesRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter)

