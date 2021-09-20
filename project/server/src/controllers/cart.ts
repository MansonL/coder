import { NextFunction, Request, Response } from 'express';
import { EErrors } from '../common/EErrors';
import { IProduct } from '../models/products.interface';
import { cartApi } from '../apis/cartApi';
import { validator } from '../common/joi_schemas';
import { productsApi } from '../apis/productsApi';

/**
 *
 * Cart Controller Class
 *
 */
class CartController {
    async getProduct(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string | undefined = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validateAsync(id);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const result: IProduct[] | [] = await cartApi.getProduct(id);
        if (result.length > 0) res.status(200).send(result);
        next(ApiError.notFound(EErrors.ProductNotFound));
    }
    async getCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const result: IProduct[] | [] = await cartApi.getProduct();
        console.log(`[PATH] Inside controller.`);
        if (result.length !== 0) res.status(200).send(result);
        next(ApiError.notFound(EErrors.NoProducts));
    }

    async addToCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validate(id);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const product: IProduct[] | [] = await productsApi.getProduct(id);
        if (product.length > 0) {
            const results = await cartApi.addProduct(product[0]);
            res.status(200).send(results);
        } else {
            next(ApiError.notFound(EErrors.ProductNotFound));
        }
    }

    async deleteFromCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const id: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validate(id);
        if (error) next(ApiError.badRequest(EErrors.IdIncorrect));
        const product: IProduct[] | [] = await cartApi.getProduct(id);
        if (product.length > 0) {
            const result = await cartApi.deleteProduct(id);
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EErrors.ProductNotFound));
        }
    }
}

export const c_controller = new CartController();
