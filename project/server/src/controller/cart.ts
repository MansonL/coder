import { NextFunction, Request, Response } from 'express';
import { cartApi } from '../api/cart';
import { productsApi } from '../api/products';
import { EProductsErrors } from '../common/EErrors';
import { IMongoCartProduct, IMongoProduct, InternalError } from '../interfaces/interfaces';
import { ApiError } from '../utils/errorApi';
import { validator } from '../utils/joiSchemas';

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
        if (error) {
            next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        } else {
            const result: IMongoCartProduct[] | InternalError | ApiError = await cartApi.getProduct(
                id
            );
            
        }
    }
    async getCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const result: IMongoCartProduct[] | [] = await cartApi.getProduct();
        console.log(`[PATH] Inside controller.`);
        if (result.length !== 0) {
            res.status(200).send(result);
        } else {
            next(ApiError.notFound(EProductsErrors.NoProducts));
        }
    }

    async addToCart(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const productID: string = req.params.id;
        console.log(`[PATH] Inside controller.`);
        const { error } = await validator.id.validate(productID);
        if (error) {
            next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        } else {
            const products: IMongoProduct[] | [] = await productsApi.getProduct(
                productID
            );
            if (products.length > 0) {
                const { _id, ...product } = products[0];
                const results = await cartApi.addProduct(
                    _id.toString(),
                    product
                );
                res.status(200).send(results);
            } else {
                next(ApiError.notFound(EProductsErrors.ProductNotFound));
            }
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
        if (error) {
            next(ApiError.badRequest(EProductsErrors.IdIncorrect));
        } else {
            const product: IMongoCartProduct[] | IMongoCartProduct[] | [] =
                await cartApi.getProduct(id);
            if (product.length > 0) {
                const result = await cartApi.deleteProduct(id);
                res.status(200).send(result);
            } else {
                next(ApiError.notFound(EProductsErrors.ProductNotFound));
            }
        }
    }
}

export const cart_controller = new CartController();
